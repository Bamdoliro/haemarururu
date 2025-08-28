import dayjs from 'dayjs';
import 'dayjs/locale/ko';

dayjs.locale('ko');

export const SCHEDULE = {
  원서_접수: dayjs(process.env.NEXT_PUBLIC_FORM_START),
  원서_접수_마감: dayjs(process.env.NEXT_PUBLIC_FORM_END),
  일차_합격_발표: dayjs(process.env.NEXT_PUBLIC_FIRST_RESULT),
  이차_면접: dayjs(process.env.NEXT_PUBLIC_INTERVIEW_START),
  이차_면접_종료: dayjs(process.env.NEXT_PUBLIC_INTERVIEW_END),
  최종_합격_발표: dayjs(process.env.NEXT_PUBLIC_FINAL_RESULT),
  입학_등록: dayjs(process.env.NEXT_PUBLIC_REGISTRATION_START),
  입학_등록_마감: dayjs(process.env.NEXT_PUBLIC_REGISTRATION_END),
};

export const SCORE = {
  REGULAR_TYPE: 80,
  SPECIAL_TYPE: 48,
  ATTENDANCE: 14,
  MIN_ATTENDANCE: 0,
  MAX_ATTENDANCE: 18,
};

export const COUNT = {
  MAX_ABSENCE: 18,
};

export const WEIGHT = {
  REGULAR_21_22: 4.8,
  REGULAR_31: 7.2 * 2,
  SPECIAL_21_22: 2.88,
  SPECIAL_31: 4.32 * 2,
};

export const ATTENDANCE_TYPE = [
  'absenceCount',
  'latenessCount',
  'earlyLeaveCount',
  'classAbsenceCount',
];

export const ATTENDANCE_GRADE = ['attendance1', 'attendance2', 'attendance3'];

export const SCORE_TABLE = {
  A: 40,
  B: 32,
  C: 24,
  D: 16,
  E: 8,
} as const;

export const SUBJECT_WEIGHT = {
  국어: [0.24, 0.24, 0.24, 0.24],
  수학: [0.28, 0.28, 0.28, 0.28],
  영어: [0.28, 0.28, 0.28, 0.28],
  사회: [0.1, 0.1, 0.1, 0.1],
  과학: [0.1, 0.1, 0.1, 0.1],
};
