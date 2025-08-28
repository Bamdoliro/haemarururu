export type AreaCategory =
  | 'BUSAN'
  | 'OTHER_AREA'
  | '강서구'
  | '금정구'
  | '기장군'
  | '남구'
  | '동구'
  | '동래구'
  | '부산진구'
  | '북구'
  | '사상구'
  | '사하구'
  | '서구'
  | '수영구'
  | '연제구'
  | '영도구'
  | '중구'
  | '해운대구'
  | '';

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

export type AnalysisApplicantType =
  | 'FIRST_PASSED'
  | 'FAILED'
  | 'PASSED'
  | 'NO_SHOW'
  | 'RECEIVED'
  | 'FIRST_FAILED'
  | 'ENTERED';

export type AnalysisApplicantCountType = 'CURRENT' | 'ORIGINAL';

export type FormTypeMainCategory = 'REGULAR' | 'SPECIAL' | 'SUPERNUMERARY';

export type GenderRatioCategory =
  | 'REGULAR'
  | 'MEISTER_TALENT'
  | 'SOCIAL_INTEGRATION'
  | 'SPECIAL_ADMISSION'
  | 'NATIONAL_VETERANS_EDUCATION';

export interface ApplicantCountType {
  type: FormType;
  count: number;
}

export interface GradeDistributionType {
  type: FormType;
  firstRoundMax: number;
  firstRoundMin: number;
  firstRoundAvg: number;
  totalMax: number;
  totalMin: number;
  totalAvg: number;
}

export interface GenderRatioType {
  category: GenderRatioCategory;
  busanMale: number;
  otherLocationMale: number;
}

export interface GraduatedSchoolStatus {
  applicantName: string;
  schoolName: string;
  schoolAddress: string;
}

export interface GenderRatioCount {
  maleCount: number;
  regularRatio: GenderRatio;
  specialRatio: GenderRatio;
  supernumeraryRatio: GenderRatio;
}

export interface GenderRatio {
  totalMale: number;
}
