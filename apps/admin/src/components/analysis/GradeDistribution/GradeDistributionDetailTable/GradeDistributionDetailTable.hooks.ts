import type { AnalysisRoundType, GradeDistributionType } from '@/types/analysis/client';

const useMaxMin = (
  formList: GradeDistributionType[] | undefined,
  roundType: AnalysisRoundType | null
) => {
  const firstRoundMax =
    formList && formList.length > 0
      ? Math.max(...formList.map((item) => item.firstRoundMax)).toFixed(3)
      : '0.000';

  const firstRoundMinValues =
    formList?.map((item) => item.firstRoundMin).filter((value) => value !== 0) ?? [];
  const firstRoundMin =
    firstRoundMinValues.length > 0
      ? Math.min(...firstRoundMinValues).toFixed(3)
      : '0.000';

  const secondRoundMax =
    formList && formList.length > 0
      ? Math.max(...formList.map((item) => item.totalMax)).toFixed(3)
      : '0.000';

  const secondRoundMinValues =
    formList?.map((item) => item.totalMin).filter((value) => value !== 0) ?? [];
  const secondRoundMin =
    secondRoundMinValues.length > 0
      ? Math.min(...secondRoundMinValues).toFixed(3)
      : '0.000';

  if (roundType === 'FIRST') {
    return { max: firstRoundMax, min: firstRoundMin };
  } else if (roundType === 'SECOND') {
    return { max: secondRoundMax, min: secondRoundMin };
  } else {
    return { max: secondRoundMax, min: firstRoundMin };
  }
};

export default useMaxMin;
