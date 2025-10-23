import type { Form, Subject } from '@/types/form/client';

export const STEP_LIST = ['성적 입력', '출결상황'] as const;

export const FORM: Form = {
  applicant: {
    name: '',
    phoneNumber: '',
    registrationNumber: '',
    gender: 'MALE',
    profile: '',
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
    graduationDate: '',
    schoolName: null,
    schoolLocation: null,
    schoolAddress: null,
    schoolCode: null,
    teacherName: null,
    schoolPhoneNumber: null,
    teacherMobilePhoneNumber: null,
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
    achievementLevel21: '-',
    achievementLevel22: '-',
    achievementLevel31: '-',
    achievementLevel32: '-',
    score: null,
  })
);
