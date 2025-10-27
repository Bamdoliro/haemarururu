import type { FormType, GradeDistributionType } from '@/types/analysis/client';

type MaxMin = { max: string; min: string };

const useMaxMinByType = (formList: GradeDistributionType[] | undefined) => {
  const get = (type: FormType): MaxMin => {
    const filtered = formList?.filter((item) => item.type === type);
    if (!filtered?.length) return { max: '0', min: '0' };
    const isValid = (v: number | null | undefined): v is number =>
      typeof v === 'number' && !Number.isNaN(v);
    const maxNum = filtered
      .flatMap((item) => [item.totalMax, item.firstRoundMax])
      .filter(isValid);
    const minNum = filtered
      .flatMap((item) => [item.totalMin, item.firstRoundMin])
      .filter(isValid);
    if (!maxNum.length && !minNum.length) return { max: '0', min: '0' };
    return {
      max: maxNum.length ? Math.max(...maxNum).toFixed(2) : '0',
      min: minNum.length ? Math.min(...minNum).toFixed(2) : '0',
    };
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
