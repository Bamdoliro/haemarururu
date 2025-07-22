import type { Form, Subject } from '@/types/form/client';

export const STEP_LIST = ['성적 입력', '출결상황', '봉사시간', '자격증'] as const;

export const FORM: Form = {
  applicant: {
    name: '',
    phoneNumber: '',
    registrationNumber: '',
    gender: 'MALE',
  },
  parent: {
    name: '',
    phoneNumber: '',
    zoneCode: '',
    address: '',
    detailAddress: '',
    relation: '',
  },
  education: {
    graduationType: 'EXPECTED',
    graduationYear: '',
    schoolName: '',
    schoolLocation: '',
    schoolAddress: '',
    schoolCode: '',
    teacherName: '',
    teacherPhoneNumber: '',
    teacherMobilePhoneNumber: '',
  },
  grade: {
    subjectList: [],
    attendance1: {
      absenceCount: 0,
      latenessCount: 0,
      earlyLeaveCount: 0,
      classAbsenceCount: 0,
    },
    attendance2: {
      absenceCount: 0,
      latenessCount: 0,
      earlyLeaveCount: 0,
      classAbsenceCount: 0,
    },
    attendance3: {
      absenceCount: 0,
      latenessCount: 0,
      earlyLeaveCount: 0,
      classAbsenceCount: 0,
    },
    volunteerTime1: 0,
    volunteerTime2: 0,
    volunteerTime3: 0,
    certificateList: [],
  },
  document: {
    learningExperience: '',
    statementOfPurpose: '',
    personality: '',
  },
  type: 'REGULAR',
};

export const SUBJECT_LIST: Subject[] = ['국어', '사회', '수학', '과학', '영어'].map(
  (subject, index) => ({
    id: index,
    subjectName: subject,
    achievementLevel21: '-',
    achievementLevel22: '-',
    achievementLevel31: '-',
    achievementLevel32: '-',
    score: null,
  })
);

export const GED_SUBJECT_LIST: Subject[] = ['국어', '수학', '사회', '과학', '영어'].map(
  (subject, index) => ({
    id: index,
    subjectName: subject,
    achievementLevel21: null,
    achievementLevel22: null,
    achievementLevel31: null,
    achievementLevel32: null,
    score: 0,
  })
);

export const SELECT_GED_SUBJECT_LIST: Subject[] = [
  '도덕',
  '기술',
  '가정',
  '체육',
  '음악',
  '미술',
].map((subject, index) => ({
  id: index,
  subjectName: subject,
  achievementLevel21: null,
  achievementLevel22: null,
  achievementLevel31: null,
  achievementLevel32: null,
  score: 0,
}));
