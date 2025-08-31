import type { Certificate } from '@/types/form/client';
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
  VOLUNTEER: 14,
  MIN_ATTENDANCE: 0,
  MAX_ATTENDANCE: 18,
  MIN_VOLUNTEER: 0,
  MAX_VOLUNTEER: 18,
};

export const COUNT = {
  MAX_ABSENCE: 18,
  MIN_VOLUNTEER: 15,
  MAX_VOLUNTEER: 30,
};

export const WEIGHT = {
  REGULAR_21_22: 4.8,
  REGULAR_31: 7.2 * 2,
  SPECIAL_21_22: 2.88,
  SPECIAL_31: 4.32 * 2,
};

export const CERTIFICATE_LIST: {
  name: string;
  organization: string;
  score: string;
  value: Certificate;
}[] = [
  {
    name: '정보처리기능사',
    organization: '한국산업인력공단',
    score: '4점',
    value: 'CRAFTSMAN_INFORMATION_PROCESSING',
  },
  {
    name: '정보기기운용기능사',
    organization: '한국산업인력공단',
    score: '4점',
    value: 'CRAFTSMAN_INFORMATION_EQUIPMENT_OPERATION',
  },
  {
    name: '전자계산기기능사',
    organization: '한국산업인력공단',
    score: '4점',
    value: 'CRAFTSMAN_COMPUTER',
  },
];

export const LEVEL_LIST: { name: string; value: Certificate }[] = [
  { name: '1급(3점)', value: 'COMPUTER_SPECIALIST_LEVEL_1' },
  { name: '2급(2점)', value: 'COMPUTER_SPECIALIST_LEVEL_2' },
  { name: '3급(1점)', value: 'COMPUTER_SPECIALIST_LEVEL_3' },
];

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
];
