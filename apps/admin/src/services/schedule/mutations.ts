import { useApiError } from '@/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@maru/hooks';
import { KEY } from '@/constants/common/constant';
import type { PutCurrentScheduleReq } from '@/types/schedule/remote';
import { putCurrentSchedule } from './api';

export const usePutCurrentScheduleMutation = () => {
  const queryClient = useQueryClient();
  const { handleError } = useApiError();
  const { toast } = useToast();

  const { mutate: putCurrentScheduleMutate, ...restMutation } = useMutation({
    mutationFn: (params: PutCurrentScheduleReq) => putCurrentSchedule(params),
    onSuccess: () => {
      toast('일정이 수정되었습니다.', 'SUCCESS');
      queryClient.invalidateQueries({ queryKey: [KEY.SCHEDULE] });
    },
    onError: handleError,
  });

  return { putCurrentScheduleMutate, ...restMutation };
};
