import { KEY } from '@/constants/common/constant';
import { useAuthState } from '@maru/hooks';
import { useQuery } from '@tanstack/react-query';
import { getAdmin } from './api';

export const useAdminQuery = () => {
  const { isLoggedIn } = useAuthState();

  const { data, ...restQuery } = useQuery({
    queryKey: [KEY.ADMIN],
    queryFn: getAdmin,
    enabled: isLoggedIn,
  });
  return { data: data?.data, ...restQuery };
};
