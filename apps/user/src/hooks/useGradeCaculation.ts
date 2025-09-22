import { SCORE, SUBJECT_RATIO, SEMESTER_RATIO } from '@/constants/form/constants';
import { useFormValueStore } from '@/stores';
import { getAchivementLevel } from '@/utils';

enum AchievementScore {
  '-' = 0,
  'F' = 0,
  'A' = 40,
  'B' = 32,
  'C' = 24,
  'D' = 16,
  'E' = 8,
}

type AchievementLevelKey =
  | 'achievementLevel21'
  | 'achievementLevel22'
  | 'achievementLevel31'
  | 'achievementLevel32';

type AttendanceKey =
  | 'absenceCount'
  | 'latenessCount'
  | 'earlyLeaveCount'
  | 'classAbsenceCount';

const useGradeCalculation = () => {
  const form = useFormValueStore();

  const getFallbackLevel = (subject: any, key: AchievementLevelKey): string => {
    const fallbackMap: Record<AchievementLevelKey, AchievementLevelKey> = {
      achievementLevel21: 'achievementLevel31',
      achievementLevel22: 'achievementLevel32',
      achievementLevel31: 'achievementLevel21',
      achievementLevel32: 'achievementLevel22',
    };

    const fallbackKey = fallbackMap[key];
    const fallback = subject[fallbackKey];
    return fallback && fallback !== '-' && fallback !== '미이수' ? fallback : '-';
  };

  const calculateSubjectScore = () => {
    if (!form.grade.subjectList) return 0;

    let totalScore = 0;

    form.grade.subjectList.forEach((subject) => {
      const subjectName = subject.subjectName;
      const subjectRatio = SUBJECT_RATIO[subjectName as keyof typeof SUBJECT_RATIO] || 0;

      const semesters: { key: AchievementLevelKey; ratio: number }[] = [
        { key: 'achievementLevel21', ratio: SEMESTER_RATIO['2-1'] },
        { key: 'achievementLevel22', ratio: SEMESTER_RATIO['2-2'] },
        { key: 'achievementLevel31', ratio: SEMESTER_RATIO['3-1'] },
        { key: 'achievementLevel32', ratio: SEMESTER_RATIO['3-2'] },
      ];

      semesters.forEach(({ key, ratio }) => {
        type AchievementLevel = keyof typeof AchievementScore;

        let achievementLevel = subject[key] as AchievementLevel;

        if (!achievementLevel || achievementLevel === 'F') {
          achievementLevel = getFallbackLevel(subject, key) as AchievementLevel;
        }

        if (achievementLevel === '-' || achievementLevel === 'F') return;

        const score =
          AchievementScore[achievementLevel as keyof typeof AchievementScore] || 0;
        totalScore += score * ratio * subjectRatio * 3.5;
      });
    });

    return Number(totalScore.toFixed(2));
  };

  const calculateRegularScore = () => {
    if (form.education.graduationType === 'QUALIFICATION_EXAMINATION') {
      let regularTotal = 0;

      form.grade.subjectList?.forEach((subject) => {
        const achievementLevel = subject.score ? getAchivementLevel(subject.score) : 'E';
        const score =
          AchievementScore[achievementLevel as keyof typeof AchievementScore] ||
          AchievementScore.E;
        if (subject.subjectName === '수학') {
          regularTotal += score * 2;
        } else {
          regularTotal += score;
        }
      });
      return Number(regularTotal.toFixed(3));
    }

    const subjectScore = calculateSubjectScore();

    return Number(subjectScore.toFixed(3));
  };

  const calculateAttendanceScore = () => {
    if (form.education.graduationType === 'QUALIFICATION_EXAMINATION') {
      return SCORE.ATTENDANCE;
    }

    const getAttendanceCount = (type: AttendanceKey) => {
      return (
        (form.grade.attendance1?.[type] || 0) +
        (form.grade.attendance2?.[type] || 0) +
        (form.grade.attendance3?.[type] || 0)
      );
    };

    const totalAbsence = getAttendanceCount('absenceCount');
    const totalLateEarly =
      getAttendanceCount('latenessCount') +
      getAttendanceCount('earlyLeaveCount') +
      getAttendanceCount('classAbsenceCount');

    const convertedAbsence = Math.floor(totalLateEarly / 3);
    const totalAbsenceCount = totalAbsence + convertedAbsence;

    const attendanceScore = -totalAbsenceCount;

    return attendanceScore;
  };

  const regularScore = calculateRegularScore();
  const attendanceScore = calculateAttendanceScore();

  const regularTotalScore = Math.min(
    Number((regularScore + attendanceScore).toFixed(3)),
    SCORE.MAX_SCORE
  );
  const specialTotalScore = Math.min(SCORE.MAX_SCORE);

  return {
    regularScore,
    attendanceScore,
    regularTotalScore: Number(regularTotalScore),
    specialTotalScore: Number(specialTotalScore),
    subjectScore: calculateSubjectScore(),
  };
};

export default useGradeCalculation;
