import { useApiError } from '@/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getFormUrl,
  patchFinalStatus,
  patchSecondRoundResult,
  patchSecondRoundResultAuto,
  patchSecondScoreFormat,
} from './api';
import { toast } from 'react-toastify';
import { KEY } from '@/constants/common/constant';
import type { PatchSecondRoundResultReq } from '@/types/form/remote';
import { useSetIsSecondRoundResultEditingStore } from '@/store/form/isSecondRoundResultEditing';
import { useSetSecondRoundResultStore } from '@/store/form/secondRoundResult';
import { isPopupBlocked } from '@/utils';

export const useUploadSecondScoreFormatMutation = (handleCloseModal: () => void) => {
  const { handleError } = useApiError();
  const queryClient = useQueryClient();

  const downloadBlob = (blob: Blob, filename: string) => {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  };

  const { mutate: uploadSecondScoreFormat, ...restMutation } = useMutation({
    mutationFn: (formData: FormData) => patchSecondScoreFormat(formData),
    onSuccess: async (res) => {
      const contentType = res.headers['content-type'] ?? '';
      const blob = res.data as Blob;

      try {
        if (contentType.includes('application/json')) {
          const { message } = await blob.text().then(JSON.parse);
          toast.error(message || '잘못된 파일입니다.');
          return;
        }
        switch (res.status) {
          case 204:
            toast.success('파일이 입력되었습니다.');
            queryClient.invalidateQueries({ queryKey: [KEY.FORM_LIST] });
            break;

          case 400:
            downloadBlob(blob, '점수입력_오류결과.xlsx');
            toast.error('오류가 있는 파일이 다운로드되었습니다.');
            break;

          default:
            toast.error('알 수 없는 응답입니다.');
        }
      } finally {
        handleCloseModal();
      }
    },
    onError: handleError,
  });

  return { uploadSecondScoreFormat, ...restMutation };
};

export const useEditSecondRoundResultMutation = (
  secondRoundResultData: PatchSecondRoundResultReq
) => {
  const { handleError } = useApiError();
  const queryClient = useQueryClient();

  const setIsSecondRoundResultEditing = useSetIsSecondRoundResultEditingStore();
  const setSecondRoundResult = useSetSecondRoundResultStore();

  const { mutate: editSecondRoundResult, ...restMutation } = useMutation({
    mutationFn: () => patchSecondRoundResult(secondRoundResultData),
    onSuccess: () => {
      toast('2차 합격 여부가 반영되었습니다.', {
        type: 'success',
      });
      queryClient.invalidateQueries({ queryKey: [KEY.FORM_LIST] });
      setIsSecondRoundResultEditing(false);
      setSecondRoundResult({});
    },
    onError: handleError,
  });

  return { editSecondRoundResult, ...restMutation };
};

export const useAutoSecondRoundResultMutation = () => {
  const { handleError } = useApiError();
  const queryClient = useQueryClient();

  const { mutate: autoSecondRoundResult, ...restMutation } = useMutation({
    mutationFn: patchSecondRoundResultAuto,
    onSuccess: () => {
      toast('2차 합격 여부가 모두 반영되었습니다.', {
        type: 'success',
      });
      queryClient.invalidateQueries({ queryKey: [KEY.FORM_LIST] });
    },
    onError: handleError,
  });

  return { autoSecondRoundResult, ...restMutation };
};

export const usePrintFormUrlMutation = () => {
  const { handleError } = useApiError();

  const { mutate: printFormUrl, ...restMutation } = useMutation({
    mutationFn: (formIdList: number[]) => getFormUrl(formIdList),
    onSuccess: (data) => {
      let hasShownAlert = false;
      data.dataList.forEach((form) => {
        const link = window.open(form.formUrl);

        if (isPopupBlocked(link) && !hasShownAlert) {
          alert('팝업 및 리디렉션을 허용해주세요');
          hasShownAlert = true;
        }
      });
    },
    onError: handleError,
  });

  return { printFormUrl, ...restMutation };
};

export const useChangeFinalStatusMutation = (
  id: number,
  status: string,
  closeModal: () => void
) => {
  const { handleError } = useApiError();
  const { mutate: changeFinalStatus, ...restMutation } = useMutation({
    mutationFn: () => patchFinalStatus(id, status),
    onSuccess: () => {
      toast('최종 접수 상태가 변경되었습니다.', { type: 'success' });
      closeModal();
    },
    onError: handleError,
  });
  return { changeFinalStatus, ...restMutation };
};
