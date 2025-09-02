import { SCORE_TABLE, SUBJECT_WEIGHT } from '@/constants/form/constants';
import { useFormValueStore } from '@/stores';

type AchievementLevelKey =
  | 'achievementLevel21'
  | 'achievementLevel22'
  | 'achievementLevel31'
  | 'achievementLevel32';

type AttenedanceKey =
  | 'absenceCount'
  | 'latenessCount'
  | 'earlyLeaveCount'
  | 'classAbsenceCount';

const useGradeCalculation = () => {
  const form = useFormValueStore();
  const calculateRegularScore = () => {
    if (form.education.graduationType === 'QUALIFICATION_EXAMINATION') {
      return 0;
    }

    const semesterKeys: AchievementLevelKey[] = [
      'achievementLevel21',
      'achievementLevel22',
      'achievementLevel31',
      'achievementLevel32',
    ];

    const SEMESTER_WEIGHT = [0.2, 0.2, 0.3, 0.3];

    let total = 0;

    form.grade.subjectList?.forEach((subject) => {
      const subjectWeight =
        SUBJECT_WEIGHT[subject.subjectName as keyof typeof SUBJECT_WEIGHT];
      if (!subjectWeight) return;

      semesterKeys.forEach((key, i) => {
        const level = subject[key as keyof typeof subject];
        if (!level || level === '-') return;

        const score = SCORE_TABLE[level as keyof typeof SCORE_TABLE];
        const semesterRate = SEMESTER_WEIGHT[i];
        const subjectRate = subjectWeight[i];

        total += score * semesterRate * subjectRate * 3.5;
      });
    });

    return Number(total.toFixed(3));
  };

  const calculateSpecialScore = () => {
    if (form.education.graduationType === 'QUALIFICATION_EXAMINATION') {
      return 0;
    }

    return calculateRegularScore();
  };

  const calculateAttendanceScore = () => {
    if (form.education.graduationType === 'QUALIFICATION_EXAMINATION') {
      return 0;
    }

    const getCount = (type: AttenedanceKey) =>
      form.grade.attendance1[type] +
      form.grade.attendance2[type] +
      form.grade.attendance3[type];

    const absence = getCount('absenceCount');
    const extra = Math.floor(
      (getCount('latenessCount') +
        getCount('earlyLeaveCount') +
        getCount('classAbsenceCount')) /
        3
    );

    const totalDays = absence + extra;
    if (totalDays === 0) return 0;

    return -totalDays;
  };

  const regularScore = calculateRegularScore();
  const specialScore =
    form.type === 'SPECIAL_ADMISSION' ? calculateRegularScore() : calculateSpecialScore();
  const attendanceScore = calculateAttendanceScore();

  const regularTotalScore = (regularScore + attendanceScore).toFixed(3);
  const specialTotalScore = (specialScore + attendanceScore).toFixed(3);

  return {
    regularScore,
    specialScore,
    attendanceScore,
    certificateScore: 0,
    regularTotalScore,
    specialTotalScore,
  };
};

export default useGradeCalculation;
