import type { FormType, GradeDistributionType } from '@/types/analysis/client';

const useMaxMinByType = (formList: GradeDistributionType[] | undefined) => {
  const getMaxMinByType = (type: FormType) => {
    const entries = formList?.filter((item) => item.type === type);
    if (!entries || entries.length === 0) {
      return { max: 0, min: 0 };
    }
    const max = Math.max(...entries.map((item) => item.totalMax)).toFixed(3);
    const min = Math.min(...entries.map((item) => item.totalMin)).toFixed(3);

    return { max, min };
  };

  return {
    regularApplicant: getMaxMinByType('REGULAR'),
    nationalVeteransApplicant: getMaxMinByType('NATIONAL_VETERANS'),
    nationalBasicLivingApplicant: getMaxMinByType('NATIONAL_BASIC_LIVING'),
    oneParentApplicant: getMaxMinByType('ONE_PARENT'),
    nearPovertyApplicant: getMaxMinByType('NEAR_POVERTY'),
    lowerMiddleApplicant: getMaxMinByType('LOWER_MIDDLE'),
    principalRecommendationApplicant: getMaxMinByType('PRINCIPAL_RECOMMENDATION'),
    superintendentRecommendationApplicant: getMaxMinByType(
      'SUPERINTENDENT_RECOMMENDATION'
    ),
    multiculturalApplicant: getMaxMinByType('MULTICULTURAL'),
    fromNorthKoreaApplicant: getMaxMinByType('FROM_NORTH_KOREA'),
    specialEducationStudentApplicant: getMaxMinByType('SPECIAL_EDUCATION_STUDENT'),
    childWelfareFacilityApplicant: getMaxMinByType('CHILD_WELFARE_FACILITY'),
    teenHouseholderApplicant: getMaxMinByType('TEEN_HOUSEHOLDER'),
    grandfamilyApplicant: getMaxMinByType('GRANDFAMILY'),
    disabledParentApplicant: getMaxMinByType('DISABLED_PARENT'),
    fallenHeroApplicant: getMaxMinByType('FALLEN_HERO'),
    multiChildrenApplicant: getMaxMinByType('MULTI_CHILDREN'),
  };
};

export default useMaxMinByType;
