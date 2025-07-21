import type { ApplicantCountType, FormType } from '@/types/analysis/client';

const useApplicantRatios = (formList: ApplicantCountType[] | undefined) => {
  const getRatioByType = (type: FormType) => {
    const totalCount = formList?.reduce((sum, item) => sum + item.count, 0) || 0;
    if (totalCount === 0) return '0%';

    const entry = formList?.find((item) => item.type === type);
    return entry ? ((entry.count / totalCount) * 100).toFixed(3) + '%' : '0%';
  };

  return {
    regularApplicant: getRatioByType('REGULAR'),
    nationalVeteransApplicant: getRatioByType('NATIONAL_VETERANS'),
    nationalBasicLivingApplicant: getRatioByType('NATIONAL_BASIC_LIVING'),
    oneParentApplicant: getRatioByType('ONE_PARENT'),
    nearPovertyApplicant: getRatioByType('NEAR_POVERTY'),
    lowerMiddleApplicant: getRatioByType('LOWER_MIDDLE'),
    principalRecommendationApplicant: getRatioByType('PRINCIPAL_RECOMMENDATION'),
    superintendentRecommendationApplicant: getRatioByType(
      'SUPERINTENDENT_RECOMMENDATION'
    ),
    multiculturalApplicant: getRatioByType('MULTICULTURAL'),
    fromNorthKoreaApplicant: getRatioByType('FROM_NORTH_KOREA'),
    specialEducationStudentApplicant: getRatioByType('SPECIAL_EDUCATION_STUDENT'),
    childWelfareFacilityApplicant: getRatioByType('CHILD_WELFARE_FACILITY'),
    teenHouseholderApplicant: getRatioByType('TEEN_HOUSEHOLDER'),
    grandfamilyApplicant: getRatioByType('GRANDFAMILY'),
    disabledParentApplicant: getRatioByType('DISABLED_PARENT'),
    fallenHeroApplicant: getRatioByType('FALLEN_HERO'),
    multiChildrenApplicant: getRatioByType('MULTI_CHILDREN'),
  };
};

export default useApplicantRatios;
