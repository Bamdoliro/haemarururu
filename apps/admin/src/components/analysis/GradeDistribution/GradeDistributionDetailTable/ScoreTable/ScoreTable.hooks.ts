import type { AnalysisRoundType, GradeDistributionType } from '@/types/analysis/client';

const useScoreStatus = (
  formList: GradeDistributionType[] | undefined,
  roundType: AnalysisRoundType
) => {
  const isValid = (v: number | null | undefined): v is number =>
    typeof v === 'number' && !Number.isNaN(v);

  const isSpecialAdmission = (item: GradeDistributionType) =>
    !['REGULAR', 'SPECIAL_ADMISSION', 'NATIONAL_VETERANS_EDUCATION'].includes(item.type);

  const getMaxValue = (
    filter: (item: GradeDistributionType) => boolean,
    field: 'firstRoundMax' | 'totalMax'
  ) => {
    if (!formList) return '0.000';
    const avgField = field === 'firstRoundMax' ? 'firstRoundAvg' : 'totalAvg';
    const values = formList
      .filter(filter)
      .filter((item) => {
        const avg = item[avgField];
        return isValid(avg) && avg !== 0;
      })
      .map((item) => item[field])
      .filter(isValid)
      .filter((value) => value !== 0);
    return values.length ? Math.max(...values).toFixed(3) : '0.000';
  };

  const getMinValue = (
    filter: (item: GradeDistributionType) => boolean,
    field: 'firstRoundMin' | 'totalMin'
  ) => {
    if (!formList) return '0.000';
    const avgField = field === 'firstRoundMin' ? 'firstRoundAvg' : 'totalAvg';

    const values = formList
      .filter(filter)
      .filter((item) => {
        const avg = item[avgField];
        return isValid(avg) && avg !== 0;
      })
      .map((item) => item[field])
      .filter(isValid)
      .filter((value) => value !== 0);
    return values.length ? Math.min(...values).toFixed(3) : '0.000';
  };

  const getAvgValue = (
    filter: (item: GradeDistributionType) => boolean,
    field: 'firstRoundAvg' | 'totalAvg'
  ) => {
    if (!formList) return '0.000';
    const values = formList
      .filter(filter)
      .map((item) => item[field])
      .filter((value) => isValid(value) && value !== 0);
    return values.length > 0
      ? (values.reduce((sum, v) => sum + v, 0) / values.length).toFixed(3)
      : '0.000';
  };

  const getSeventyValue = (
    filter: (item: GradeDistributionType) => boolean,
    field: 'firstRoundSeventyPercentile' | 'totalSeventyPercentile'
  ) => {
    if (!formList) return '0.000';
    const avgField =
      field === 'firstRoundSeventyPercentile' ? 'firstRoundAvg' : 'totalAvg';

    const values = formList
      .filter(filter)
      .filter((item) => {
        const avg = item[avgField];
        return isValid(avg) && avg !== 0;
      })
      .map((item) => item[field])
      .filter(isValid)
      .filter((value) => value !== 0);
    return values.length > 0 ? Math.max(...values).toFixed(3) : '0.000';
  };

  const maxField = roundType === 'FIRST' ? 'firstRoundMax' : 'totalMax';
  const minField = roundType === 'FIRST' ? 'firstRoundMin' : 'totalMin';
  const avgField = roundType === 'FIRST' ? 'firstRoundAvg' : 'totalAvg';
  const seventyField =
    roundType === 'FIRST' ? 'firstRoundSeventyPercentile' : 'totalSeventyPercentile';

  const regularRoundMax = getMaxValue((item) => item.type === 'REGULAR', maxField);
  const SpecialAdmissionRoundMax = getMaxValue(isSpecialAdmission, maxField);
  const regularRoundMin = getMinValue((item) => item.type === 'REGULAR', minField);
  const specialAdmissionRoundMin = getMinValue(isSpecialAdmission, minField);

  const regularRoundAvg = getAvgValue((item) => item.type === 'REGULAR', avgField);
  const SpecialAdmissionRoundAvg = getAvgValue(isSpecialAdmission, avgField);

  const regularRoundSeventy = getSeventyValue(
    (item) => item.type === 'REGULAR',
    seventyField
  );
  const specialAdmissionSeventy = getSeventyValue(isSpecialAdmission, seventyField);

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
