import type { AnalysisRoundType, GradeDistributionType } from '@/types/analysis/client';

const useMaxMin = (
  formList: GradeDistributionType[] | undefined,
  roundType: AnalysisRoundType | null
) => {
  const getValidValues = (values: (number | null)[]) =>
    values.filter((value) => value !== null && value !== 0) as number[];

  const firstRoundMaxValues = getValidValues(
    formList?.map((item) => item.firstRoundMax) ?? []
  );
  const firstRoundMax =
    firstRoundMaxValues.length > 0
      ? Math.max(...firstRoundMaxValues).toFixed(3)
      : '0.000';
  const firstRoundMinValues = getValidValues(
    formList?.map((item) => item.firstRoundMin) ?? []
  );
  const firstRoundMin =
    firstRoundMinValues.length > 0
      ? Math.min(...firstRoundMinValues).toFixed(3)
      : '0.000';

  const secondRoundMaxValues = getValidValues(
    formList?.map((item) => item.totalMax) ?? []
  );
  const secondRoundMax =
    secondRoundMaxValues.length > 0
      ? Math.max(...secondRoundMaxValues).toFixed(3)
      : '0.000';

  const secondRoundMinValues = getValidValues(
    formList?.map((item) => item.totalMin) ?? []
  );
  const secondRoundMin =
    secondRoundMinValues.length > 0
      ? Math.min(...secondRoundMinValues).toFixed(3)
      : '0.000';

  if (roundType === 'FIRST') {
    return { max: firstRoundMax, min: firstRoundMin };
  } else if (roundType === 'SECOND') {
    return { max: secondRoundMax, min: secondRoundMin };
  } else {
    return {
      max: firstRoundMax > secondRoundMax ? firstRoundMax : secondRoundMax,
      min: firstRoundMin < secondRoundMin ? firstRoundMin : secondRoundMin,
    };
  }
};

export default useMaxMin;
