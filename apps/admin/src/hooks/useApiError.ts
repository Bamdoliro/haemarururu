import type { AxiosError } from 'axios';
import { isAxiosError } from 'axios';
import { useToast } from '@maru/hooks';

type ErrorStatus = 403 | 429 | 500;

interface AxiosErrorResponse {
  code: string;
  message: string;
}

const ERROR: Record<ErrorStatus, string> = {
  403: '유저의 권한이 없습니다.',
  429: '너무 많이 요청하였습니다. 조금 뒤 다시 이용해주세요.',
  500: '서버에 알 수 없는 오류가 발생하였습니다.',
};

const useApiError = () => {
  const { toast } = useToast();

  const handleError = (error: AxiosError<AxiosErrorResponse>) => {
    if (isAxiosError(error)) {
      if (error.response) {
        const status = error.response.status as ErrorStatus;
        const message = error.response.data.message || ERROR[status];
        toast(message, 'ERROR');
      } else {
        toast('알 수 없는 오류가 발생하였습니다.', 'ERROR');
      }
    } else {
      toast('알 수 없는 오류가 발생하였습니다.', 'ERROR');
    }
  };

  return { handleError };
};

export default useApiError;
