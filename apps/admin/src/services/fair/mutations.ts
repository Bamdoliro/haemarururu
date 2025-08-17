import { useMutation } from '@tanstack/react-query';
import type { FairApiRequestBody } from '@/components/fair/FairForm/fair.hooks';
import { postFairReq } from '@/services/fair/api';
import { useApiError } from '@/hooks';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

export const useCreateFairMutation = () => {
  const { handleError } = useApiError();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: FairApiRequestBody) => postFairReq(data),
    onSuccess: () => {
      toast.success('입학 설명회 일정이 만들어졌습니다.', {
        type: 'success',
      });
      router.push('/fair');
    },
    onError: handleError,
  });
};
