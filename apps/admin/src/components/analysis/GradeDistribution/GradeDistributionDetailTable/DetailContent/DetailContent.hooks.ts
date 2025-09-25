import type { FormType, GradeDistributionType } from '@/types/analysis/client';

type MaxMin = { max: string; min: string };

const useMaxMinByType = (formList: GradeDistributionType[] | undefined) => {
  const get = (type: FormType): MaxMin => {
    const entries = formList?.filter((v) => v.type === type) ?? [];
    if (entries.length === 0) return { max: '0', min: '0' };
    const maxNum = Math.max(...entries.map((v) => v.totalMax));
    const minNum = Math.min(...entries.map((v) => v.totalMin));
    return { max: String(maxNum), min: String(minNum) };
  };

  return {
    regularApplicant: get('REGULAR'),
    nationalVeteransApplicant: get('NATIONAL_VETERANS'),
    nationalBasicLivingApplicant: get('NATIONAL_BASIC_LIVING'),
    oneParentApplicant: get('ONE_PARENT'),
    nearPovertyApplicant: get('NEAR_POVERTY'),
    lowerMiddleApplicant: get('LOWER_MIDDLE'),
    principalRecommendationApplicant: get('PRINCIPAL_RECOMMENDATION'),
    superintendentRecommendationApplicant: get('SUPERINTENDENT_RECOMMENDATION'),
    multiculturalApplicant: get('MULTICULTURAL'),
    fromNorthKoreaApplicant: get('FROM_NORTH_KOREA'),
    specialEducationStudentApplicant: get('SPECIAL_EDUCATION_STUDENT'),
    childWelfareFacilityApplicant: get('CHILD_WELFARE_FACILITY'),
    teenHouseholderApplicant: get('TEEN_HOUSEHOLDER'),
    grandfamilyApplicant: get('GRANDFAMILY'),
    disabledParentApplicant: get('DISABLED_PARENT'),
    fallenHeroApplicant: get('FALLEN_HERO'),
    multiChildrenApplicant: get('MULTI_CHILDREN'),
    nonstatutoryoneparentApplicant: get('NON_STATUTORY_ONE_PARENT'),
    welfarefacilityworkerApplicant: get('WELFARE_FACILITY_WORKER'),
    publicservantApplicant: get('PUBLIC_SERVANT'),
    streetcleanerApplicant: get('STREET_CLEANER'),
    deployedsoldierApplicant: get('DEPLOYED_SOLDIER'),
    postmanApplicant: get('POSTMAN'),
    intangibleculturalheritageApplicant: get('INTANGIBLE_CULTURAL_HERITAGE'),
    sailorApplicant: get('SAILOR'),
    specialadmissionApplicant: get('SPECIAL_ADMISSION'),
    nationalveteranseducationApplicant: get('NATIONAL_VETERANS_EDUCATION'),
  };
};

export default useMaxMinByType;
