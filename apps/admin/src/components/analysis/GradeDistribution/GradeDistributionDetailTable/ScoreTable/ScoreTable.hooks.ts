import type { GradeDistributionType } from '@/types/analysis/client';

const useScoreStatus = (formList: GradeDistributionType[] | undefined) => {
  const isValid = (v: number | null | undefined): v is number =>
    typeof v === 'number' && !Number.isNaN(v);

  const getMaxValue = (filter: (item: GradeDistributionType) => boolean) => {
    if (!formList) return '0.00';
    const values = formList
      .filter(filter)
      .map((item) => item.firstRoundMax)
      .filter(isValid);
    return values.length ? Math.max(...values).toFixed(2) : '0.00';
  };

  const getMinValue = (filter: (item: GradeDistributionType) => boolean) => {
    if (!formList) return '0.00';
    const values = formList
      .filter(filter)
      .map((item) => item.firstRoundMin)
      .filter(isValid);
    return values.length ? Math.min(...values).toFixed(2) : '0.00';
  };

  const isSpecialAdmission = (item: GradeDistributionType) =>
    !['REGULAR', 'SPECIAL_ADMISSION', 'NATIONAL_VETERANS_EDUCATION'].includes(item.type);

  const regularRoundMax = getMaxValue((item) => item.type === 'REGULAR');
  const SpecialAdmissionRoundMax = getMaxValue(isSpecialAdmission);
  const regularRoundMin = getMinValue((item) => item.type === 'REGULAR');
  const specialAdmissionRoundMin = getMinValue(isSpecialAdmission);

  const regularRoundAvg = formList
    ?.filter((item) => item.type === 'REGULAR')
    .map((item) => item.firstRoundAvg)
    .filter(isValid)
    .map((v) => v.toFixed(2)) || ['0.00'];

  const SpecialAdmissionData =
    formList?.filter(isSpecialAdmission).filter((item) => isValid(item.firstRoundAvg)) ||
    [];

  const SpecialAdmissionRoundAvg = SpecialAdmissionData.length
    ? (
        SpecialAdmissionData.reduce((sum, item) => sum + item.firstRoundAvg, 0) /
        SpecialAdmissionData.length
      ).toFixed(2)
    : '0.00';

  const regularRoundSeventy = formList
    ?.filter((item) => item.type === 'REGULAR')
    .map((item) => item.firstRoundSeventyPercentile)
    .filter(isValid)
    .map((v) => v.toFixed(2)) || ['0.00'];

  const specialAdmissionSeventyData =
    formList
      ?.filter(isSpecialAdmission)
      .filter((item) => isValid(item.firstRoundSeventyPercentile)) || [];

  const specialAdmissionSeventy = specialAdmissionSeventyData.length
    ? (
        specialAdmissionSeventyData.reduce(
          (sum, item) => sum + item.firstRoundSeventyPercentile,
          0
        ) / specialAdmissionSeventyData.length
      ).toFixed(2)
    : '0.00';

  return {
    regularRoundMax,
    SpecialAdmissionRoundMax,
    regularRoundMin,
    specialAdmissionRoundMin,
    regularRoundAvg,
    SpecialAdmissionRoundAvg,
    regularRoundSeventy,
    specialAdmissionSeventy,
  };
};

export default useScoreStatus;
