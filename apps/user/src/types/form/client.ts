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

export interface FormStatus {
  id: number;
  name: string;
  status:
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
  type: FormType;
}

export interface Form {
  applicant: User;
  parent: Parent;
  education: Education;
  grade: {
    subjectList: SubjectList[];
    attendance1: Attendance;
    attendance2: Attendance;
    attendance3: Attendance;
    volunteerTime1: number;
    volunteerTime2: number;
    volunteerTime3: number;
    certificateList: Certificate[];
  };
  document: {
    learningExperience: string;
    statementOfPurpose: string;
    personality: string;
  };
  type: FormType;
}

export interface User {
  name: string;
  phoneNumber: string;
  registrationNumber: string;
  gender: 'FEMALE' | 'MALE';
}

export interface Parent {
  name: string;
  phoneNumber: string;
  relation: string;
  zoneCode: string;
  address: string;
  detailAddress: string;
}

export interface Education {
  graduationType: GraduationType;
  graduationYear: string;
  schoolName: string | null;
  schoolLocation: string | null;
  schoolAddress: string | null;
  schoolCode: string | null;
  teacherName: string | null;
  teacherPhoneNumber: string | null;
  teacherMobilePhoneNumber: string | null;
}

export interface Grade {
  subjectList: SubjectList[];
  attendance1: Attendance;
  attendance2: Attendance;
  attendance3: Attendance;
  volunteerTime1: number;
  volunteerTime2: number;
  volunteerTime3: number;
  certificateList: Certificate[];
}

export type GraduationType = 'QUALIFICATION_EXAMINATION' | 'EXPECTED' | 'GRADUATED';

export type SubjectList = Omit<Subject, 'id'>;

export interface Subject {
  id: number;
  subjectName: string;
  achievementLevel21: AchievementLevel | null;
  achievementLevel22: AchievementLevel | null;
  achievementLevel31: AchievementLevel | null;
  achievementLevel32: AchievementLevel | null;
  score: number | null;
}

export type AchievementLevel = '-' | 'A' | 'B' | 'C' | 'D' | 'E';

export interface Attendance {
  absenceCount: number;
  latenessCount: number;
  earlyLeaveCount: number;
  classAbsenceCount: number;
}

export type Certificate =
  | 'COMPUTER_SPECIALIST_LEVEL_3'
  | 'COMPUTER_SPECIALIST_LEVEL_2'
  | 'COMPUTER_SPECIALIST_LEVEL_1'
  | 'CRAFTSMAN_INFORMATION_PROCESSING'
  | 'CRAFTSMAN_INFORMATION_EQUIPMENT_OPERATION'
  | 'CRAFTSMAN_COMPUTER';

export interface Incomplete {
  [subjectName: string]: {
    isIncomplete21: boolean | null;
    isIncomplete22: boolean | null;
    isIncomplete31: boolean | null;
    isIncomplete32: boolean | null;
  };
}

export type AttendanceName = 'attendance1' | 'attendance2' | 'attendance3';

export type FormStep =
  | '지원자정보'
  | '보호자정보'
  | '출신학교및학력'
  | '전형선택'
  | '성적입력'
  | '자기소개서'
  | '초안작성완료'
  | '초안제출완료'
  | '최종제출'
  | '최종제출완료';

export type GradeStep = '교과성적' | '출결상황' | '봉사시간' | '자격증';

export type SaveSubject = Omit<Subject, 'id'>;

export interface School {
  name: string;
  location: string;
  address: string;
  code: string;
}

export interface Profile {
  fileName?: string | null;
  mediaType?: string | null;
  fileSize?: number | null;
  file?: File | null;
}

export interface FinalForm {
  fileName?: string | null;
  mediaType?: string | null;
  fileSize?: number | null;
  file?: File | null;
}

export interface FormProfile {
  uploadUrl: string;
  downloadUrl: string;
}
