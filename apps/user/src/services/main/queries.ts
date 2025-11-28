import { getFairData } from '@/services/main/api';
import { useQuery } from '@tanstack/react-query';
import { KEY } from '@/constants/common/constants';

export const useFairDataQuery = () => {
  const { data, ...restQuery } = useQuery({
    queryKey: [KEY.FAIR_DATA] as const,
    queryFn: getFairData,
    retry: false,
  });
  return { data: data?.dataList, ...restQuery };
};
