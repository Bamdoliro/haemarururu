import { KEY } from '@/constants/common/constant';
import type {
  AnalysisApplicantCountReq,
  AnalysisApplicantTypeReq,
  GraduatedSchoolStatusReq,
} from '@/types/analysis/remote';
import { useQuery } from '@tanstack/react-query';
import {
  getApplicantCountList,
  getGradeDistributionList,
  getGraduatedSchoolList,
} from './api';

export const useApplicantCountQuery = (type: AnalysisApplicantCountReq) => {
  const { data, ...restQuery } = useQuery({
    queryKey: [KEY.APPLICANT_COUNT, type] as const,
    queryFn: () => getApplicantCountList(type),
  });

  return { data: data?.dataList, ...restQuery };
};

export const useGradeDistributionListQuery = (statusList: AnalysisApplicantTypeReq) => {
  const { data, ...restQuery } = useQuery({
    queryKey: [KEY.APPLICANT_GRADE_DISTRIBUTION, statusList] as const,
    queryFn: () => getGradeDistributionList(statusList),
  });

  return { data: data?.dataList, ...restQuery };
};

export const useGraduatedSchoolListQuery = (params: GraduatedSchoolStatusReq) => {
  const { data, ...restQuery } = useQuery({
    queryKey: [KEY.APPLICANT_GRADUATED_SCHOOL, params] as const,
    queryFn: () => getGraduatedSchoolList(params),
  });

  return { data: data?.dataList, ...restQuery };
};
