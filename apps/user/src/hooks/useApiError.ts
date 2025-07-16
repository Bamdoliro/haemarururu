import { isAxiosError } from 'axios';
import type { AxiosError } from 'axios';
import useToast from './useToast';

interface AxiosErrorResponse {
  code: string;
  message: string;
}

type ErrorStatus = 403 | 429 | 500;

const ERROR: Record<ErrorStatus, string> = {
  403: '다시 로그인 후 시도해주세요.',
  429: '너무 많이 요청하였습니다. 조금 뒤 다시 이용해주세요.',
  500: '서버에 알 수 없는 오류가 발생했습니다.',
};

const useApiError = () => {
  const { toast } = useToast();

  const handleError = (error: AxiosError<AxiosErrorResponse>) => {
    let errorMessage = '';
    if (isAxiosError(error)) {
      if (error.response) {
        const status = error.response.status as ErrorStatus;
        const maessage = error.response.data.message;
        errorMessage = maessage || ERROR[status];
        if (status === 500) {
          throw new Error('500');
        }
      }
    } else {
      errorMessage = '알 수 없는 오류가 발생했습니다.';
    }
    errorMessage && toast(errorMessage, 'ERROR');
  };

  return { handleError };
};

export default useApiError;
