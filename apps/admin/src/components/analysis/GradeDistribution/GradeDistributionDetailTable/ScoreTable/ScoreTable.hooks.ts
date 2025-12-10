import type { AnalysisRoundType, GradeDistributionType } from '@/types/analysis/client';

type StatField = 'Max' | 'Min' | 'Avg' | 'SeventyPercentile';
type RoundPrefix = 'firstRound' | 'total';

const useScoreStatus = (
  formList: GradeDistributionType[] | undefined,
  roundType: AnalysisRoundType
) => {
  const isValid = (v: number | null | undefined): v is number =>
    typeof v === 'number' && !Number.isNaN(v) && v !== 0;

  const isRegular = (item: GradeDistributionType) => item.type === 'REGULAR';

  const isSpecialAdmission = (item: GradeDistributionType) =>
    !['REGULAR', 'SPECIAL_ADMISSION', 'NATIONAL_VETERANS_EDUCATION'].includes(item.type);

  const getFieldName = (prefix: RoundPrefix, stat: StatField) =>
    `${prefix}${stat}` as keyof GradeDistributionType;

  const extractValues = (
    items: GradeDistributionType[],
    field: keyof GradeDistributionType,
    avgField?: keyof GradeDistributionType
  ): number[] => {
    return items
      .filter((item) => !avgField || isValid(item[avgField] as number))
      .map((item) => item[field] as number)
      .filter(isValid);
  };

  const aggregate = {
    max: (values: number[]) => (values.length ? Math.max(...values) : 0),
    min: (values: number[]) => (values.length ? Math.min(...values) : 0),
    avg: (values: number[]) =>
      values.length ? values.reduce((sum, v) => sum + v, 0) / values.length : 0,
  };

  const format = (value: number) => value.toFixed(3);

  const calculateStat = (
    filter: (item: GradeDistributionType) => boolean,
    stat: StatField,
    aggregator: (values: number[]) => number
  ): string => {
    if (!formList) return '0.000';

    const filtered = formList.filter(filter);
    const prefixes: RoundPrefix[] =
      roundType === 'ALL'
        ? ['firstRound', 'total']
        : [roundType === 'FIRST' ? 'firstRound' : 'total'];

    const avgFieldForStat =
      stat === 'Max' || stat === 'Min' || stat === 'SeventyPercentile';

    const values = prefixes.flatMap((prefix) => {
      const field = getFieldName(prefix, stat);
      const avgField = avgFieldForStat ? getFieldName(prefix, 'Avg') : undefined;
      return extractValues(filtered, field, avgField);
    });

    return format(aggregator(values));
  };

  const getStats = (filter: (item: GradeDistributionType) => boolean) => ({
    max: calculateStat(filter, 'Max', aggregate.max),
    min: calculateStat(filter, 'Min', aggregate.min),
    avg: calculateStat(filter, 'Avg', aggregate.avg),
    seventy: calculateStat(filter, 'SeventyPercentile', aggregate.max),
  });

  const regular = getStats(isRegular);
  const special = getStats(isSpecialAdmission);

  return {
    regularRoundMax: regular.max,
    SpecialAdmissionRoundMax: special.max,
    regularRoundMin: regular.min,
    specialAdmissionRoundMin: special.min,
    regularRoundAvg: regular.avg,
    SpecialAdmissionRoundAvg: special.avg,
    regularRoundSeventy: regular.seventy,
    specialAdmissionSeventy: special.seventy,
  };
};

export default useScoreStatus;
