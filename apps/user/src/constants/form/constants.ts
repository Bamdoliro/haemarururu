export const SCORE = {
  REGULAR_TYPE: 0,
  SPECIAL_TYPE: 0,
  ATTENDANCE: 0,
  MAX_SCORE: 140,
};

export const ATTENDANCE_TYPE = [
  'absenceCount',
  'latenessCount',
  'earlyLeaveCount',
  'classAbsenceCount',
];

export const ATTENDANCE_GRADE = ['attendance1', 'attendance2', 'attendance3'];

export const SUBJECT_RATIO = {
  국어: 0.24,
  수학: 0.28,
  영어: 0.28,
  사회: 0.1,
  과학: 0.1,
};

export const SEMESTER_RATIO = {
  '2-1': 0.2,
  '2-2': 0.2,
  '3-1': 0.3,
  '3-2': 0.3,
};

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

export const FORBIDDEN_WORDS = [
  'TOEFL',
  'TOEIC',
  'TEPS',
  'TESL',
  'TOSEL',
  'PELT',
  'HSK',
  'JLPT',
  '성적',
  '등급',
  '석차',
  '교과우수상',
  '수상',
  '입상',
  '금상',
  '은상',
  '동상',
  '최우수상',
  '우수상',
  '장려상',
  '올림피아드',
  '자격증',
  '영재교',
  '수료',
  '부모님',
  '아버지',
  '어머니',
  '직업',
  '직장',
  '직위',
  '소득',
  '기업',
  '변호사',
  '의사',
  '교수',
  '회장',
  '사장',
  '원장',
  '학원',
  '과외',
  '이름',
  '성명',
  '출신',
  '중학교',
  '졸업',
  '재학',
  '학년',
  '반',
  '번호',
  '주소',
  '010',
  '전화번호',
  '토익',
  '토플',
  '승마',
  '영재',
  '골프',
  '시험',
  '급수',
  '점수',
  '인증',
  '경시',
  '경시대회',
  '모의고사',
  '대회',
];
