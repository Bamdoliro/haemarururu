import { useMutation } from '@tanstack/react-query';
import type { FairApiRequestBody } from '@/components/fair/FairForm/fair.hooks';
import { deleteFair, postFairReq, putFair } from '@/services/fair/api';
import { useApiError } from '@/hooks';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/common/constant';
import type { PutFairReq } from '@/types/fair/remote';

export const useCreateFairMutation = () => {
  const { handleError } = useApiError();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: FairApiRequestBody) => postFairReq(data),
    onSuccess: () => {
      toast.success('입학 설명회 일정이 만들어졌습니다.', {
        type: 'success',
      });
      router.push(ROUTES.FAIR);
    },
    onError: handleError,
  });
};

export const usePutFairMutation = (fairId: number) => {
  const { handleError } = useApiError();
  const router = useRouter();

  const { mutate: putFairMutate, ...restMutation } = useMutation({
    mutationFn: (params: PutFairReq) => putFair(fairId, params),
    onSuccess: () => {
      toast('입학설명회가 수정되었습니다.', {
        type: 'success',
      });
      router.push(ROUTES.FAIR);
    },
    onError: handleError,
  });

  return { putFairMutate, ...restMutation };
};

export const useDeleteFairMutation = (fairId: number) => {
  const { handleError } = useApiError();
  const router = useRouter();

  const { mutate: deleteFairMutate, ...restMutation } = useMutation({
    mutationFn: () => deleteFair(fairId),
    onSuccess: () => {
      toast('입학설명회가 삭제되었습니다.', {
        type: 'success',
      });
      router.push(ROUTES.FAIR);
    },
    onError: handleError,
  });

  return { deleteFairMutate, ...restMutation };
};
