import { maru } from '@/apis/instance/instance';
import { authorization } from '@/apis/token';
import type {
  AnalysisApplicantCountReq,
  GetApplicantCountRes,
  AnalysisApplicantTypeReq,
  GetGradeDistributionRes,
  GraduatedSchoolStatusReq,
  GetGraduatedSchoolRes,
} from '@/types/analysis/remote';

export const getApplicantCountList = async ({ type }: AnalysisApplicantCountReq) => {
  const { data } = await maru.get<GetApplicantCountRes>(
    `/analysis/number-of-applicants?type=${type}`,
    authorization()
  );
  return data;
};

export const getGradeDistributionList = async ({
  statusList,
}: AnalysisApplicantTypeReq) => {
  const { data } = await maru.get<GetGradeDistributionRes>(
    `/analysis/grade-distribution?statusList=${statusList.join('&statusList=')}`,
    authorization()
  );
  return data;
};

export const getGraduatedSchoolList = async ({
  statusList,
  isBusan,
  gu,
}: GraduatedSchoolStatusReq) => {
  const { data } = await maru.get<GetGraduatedSchoolRes>(
    `/analysis/school-status?statusList=${statusList.join(
      '&statusList='
    )}&isBusan=${isBusan}&gu=${gu}`,
    authorization()
  );
  return data;
};
