import type { GradeDistributionType } from '@/types/analysis/client';

const useMaxMin = (formList: GradeDistributionType[] | undefined) => {
  const entireFirstRoundMax =
    formList && formList.length > 0
      ? Math.max(...formList.map((item) => item.firstRoundMax)).toFixed(2)
      : '0.00';

  const minList = formList
    ? formList.map((item) => item.firstRoundMin).filter((value) => value !== 0)
    : [];

  const entireFirstRoundMin =
    minList.length > 0 ? Math.min(...minList).toFixed(2) : '0.00';

  return { max: entireFirstRoundMax, min: entireFirstRoundMin };
};

export default useMaxMin;
