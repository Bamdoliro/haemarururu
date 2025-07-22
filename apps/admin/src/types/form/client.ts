export type FormStatus =
  | 'RECEIVED'
  | 'FIRST_FAILED'
  | 'FAILED'
  | 'FINAL_SUBMITTED'
  | 'SUBMITTED'
  | 'APPROVED'
  | 'NO_SHOW'
  | 'FIRST_PASSED'
  | 'PASSED'
  | 'REJECTED'
  | 'ENTERED';

export type FormType =
  | 'REGULAR'
  | 'NATIONAL_VETERANS'
  | 'NATIONAL_BASIC_LIVING'
  | 'ONE_PARENT'
  | 'NEAR_POVERTY'
  | 'LOWER_MIDDLE'
  | 'PRINCIPAL_RECOMMENDATION'
  | 'SUPERINTENDENT_RECOMMENDATION'
  | 'MULTICULTURAL'
  | 'FROM_NORTH_KOREA'
  | 'SPECIAL_EDUCATION_STUDENT'
  | 'CHILD_WELFARE_FACILITY'
  | 'TEEN_HOUSEHOLDER'
  | 'GRANDFAMILY'
  | 'DISABLED_PARENT'
  | 'FALLEN_HERO'
  | 'MULTI_CHILDREN'
  | 'NON_STATUTORY_ONE_PARENT'
  | 'WELFARE_FACILITY_WORKER'
  | 'PUBLIC_SERVANT'
  | 'STREET_CLEANER'
  | 'DEPLOYED_SOLDIER'
  | 'INTANGIBLE_CULTURAL_HERITAGE'
  | 'SAILOR'
  | 'SPECIAL_ADMISSION'
  | 'NATIONAL_VETERANS_EDUCATION';

export type GraduationType = 'EXPECTED' | 'GRADUATED' | 'QUALIFICATION_EXAMINATION';

export type PassStatusType = '합격' | '불합격' | '미정';

export type ExportExcelType =
  | '전체 내보내기'
  | '1차 전형 결과'
  | '2차 전형 결과'
  | '최종 합격자';

export interface Form {
  id: number;
  examinationNumber: number | null;
  name: string;
  birthday: string;
  graduationType: GraduationType;
  school: string;
  status: FormStatus;
  type: FormType;
  isChangedToRegular: boolean;
  totalScore: number | null;
  hasDocument: boolean | null;
  firstRoundPassed: boolean | null;
  secondRoundPassed: boolean | null;
}

export type FormListType = '모두 보기' | '검토해야 하는 원서 모아보기' | '정렬';

export type FormSort = 'total-score-asc' | 'total-score-desc' | 'form-id';

export interface FormListSortingType {
  status: FormStatus | null;
  type: FormType | null;
  sort: FormSort | null;
}

export interface FormDetail {
  id: number;
  examinationNumber: number;
  applicant: UserInfo;
  parent: ParentInfo;
  education: EducationInfo;
  grade: {
    subjectList: Subject[];
    attendance1: Attendance;
    attendance2: Attendance;
    attendance3: Attendance;
    volunteerTime1: number;
    volunteerTime2: number;
    volunteerTime3: number;
    certificateList: string[];
  };
  document: {
    learningExperience: string;
    statementOfPurpose: string;
    personality: string;
  };
  formUrl: string;
  type: FormType;
  status: FormStatus;
  changedToRegular: boolean;
}

export interface UserInfo {
  identificationPictureUri: string;
  name: string;
  phoneNumber: string;
  registrationNumber: string;
}

export interface ParentInfo {
  name: string;
  phoneNumber: string;
  relation: string;
  zoneCode: string;
  address: string;
  detailAddress: string;
}

export interface EducationInfo {
  graduationType: GraduationType;
  graduationYear: string;
  schoolName: string;
  schoolLocation: string;
  schoolCode: string;
  schoolAddress: string;
  schoolPhoneNumber: string;
  teacherName: string;
  teacherMobilePhoneNumber: string;
}

export type AchievementLevel = 'A' | 'B' | 'C' | 'D' | 'E' | '-';

export interface AchievementLevelsGroup {
  subjectName: string;
  grades: number[];
  semesters: number[];
  achievementLevels: AchievementLevel[];
}

export interface Subject {
  grade: number;
  semester: number;
  subjectName: string;
  achievementLevel: AchievementLevel;
}

export interface Attendance {
  absenceCount: number;
  latenessCount: number;
  earlyLeaveCount: number;
  classAbsenceCount: number;
}

export type FormDetailField =
  | '지원자 정보'
  | '보호자 정보'
  | '출신학교 및 학력'
  | '전형'
  | '성적'
  | '자기소개서';
