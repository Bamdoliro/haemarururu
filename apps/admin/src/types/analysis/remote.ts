import type {
  AnalysisApplicantCountType,
  ApplicantCountType,
  AnalysisApplicantType,
  GradeDistributionType,
  AreaCategory,
  GraduatedSchoolStatus,
} from './client';

export interface AnalysisApplicantCountReq {
  type: AnalysisApplicantCountType;
}

export interface GetApplicantCountRes {
  dataList: ApplicantCountType[];
}

export interface AnalysisApplicantTypeReq {
  statusList: AnalysisApplicantType[];
}

export interface GetGradeDistributionRes {
  dataList: GradeDistributionType[];
}

export interface GraduatedSchoolStatusReq {
  statusList: AnalysisApplicantType[];
  isBusan: boolean | '';
  gu?: AreaCategory | null;
}

export interface GetGraduatedSchoolRes {
  dataList: GraduatedSchoolStatus[];
}
