import { useApiError } from '@/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getFormUrl,
  getMergedFormPdf,
  patchInterviewNumber,
  patchPaymentResult,
  patchReceiveStatus,
  patchSecondRoundResult,
  patchSecondRoundResultAuto,
  patchSecondScoreFormat,
} from './api';
import { useToast } from '@maru/hooks';
import { KEY } from '@/constants/common/constant';
import type {
  PatchInterviewNumberReq,
  PatchPaymentResultReq,
  PatchSecondRoundResultReq,
} from '@/types/form/remote';
import { downloadBlob, isPopupBlocked } from '@/utils';
import { isAxiosError } from 'axios';
import type { ReceiveStatusValue } from '@/types/form/client';
import {
  interviewNumberAtom,
  isInterviewNumberEditingAtom,
  isPaymentResultEditingAtom,
  isSecondRoundResultEditingAtom,
  paymentResultAtom,
  secondRoundResultAtom,
} from '@/store';
import { useSetAtom } from 'jotai';

export const useUploadSecondScoreFormatMutation = (handleCloseModal: () => void) => {
  const { handleError } = useApiError();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate: uploadSecondScoreFormat, ...restMutation } = useMutation({
    mutationFn: (formData: FormData) => patchSecondScoreFormat(formData),
    onSuccess: async (res) => {
      const contentType = res.headers['content-type'] ?? '';
      const blob = res.data as Blob;

      try {
        if (contentType.includes('application/json')) {
          const { message } = await blob.text().then(JSON.parse);
          toast(message || '잘못된 파일입니다.', 'ERROR');
          return;
        }
        switch (res.status) {
          case 204:
            toast('파일이 입력되었습니다.', 'SUCCESS');
            queryClient.invalidateQueries({ queryKey: [KEY.FORM_LIST] });
            break;

          case 400:
            downloadBlob(blob, '점수입력_오류결과.xlsx');
            toast('오류가 있는 파일이 다운로드되었습니다.', 'ERROR');
            break;

          default:
            toast('알 수 없는 응답입니다.', 'ERROR');
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
  secondRoundResultData: PatchSecondRoundResultReq,
) => {
  const { handleError } = useApiError();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const setIsSecondRoundResultEditing = useSetAtom(isSecondRoundResultEditingAtom);
  const setSecondRoundResult = useSetAtom(secondRoundResultAtom);

  const { mutate: editSecondRoundResult, ...restMutation } = useMutation({
    mutationFn: () => patchSecondRoundResult(secondRoundResultData),
    onSuccess: () => {
      toast('면접 합격 여부가 반영되었습니다.', 'SUCCESS');
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
  const { toast } = useToast();

  const { mutate: autoSecondRoundResult, ...restMutation } = useMutation({
    mutationFn: patchSecondRoundResultAuto,
    onSuccess: () => {
      toast('면접 합격 여부가 모두 반영되었습니다.', 'SUCCESS');
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

export const useMergeFormPdfMutation = () => {
  const { handleError } = useApiError();

  const { mutate: mergeFormPdf, ...restMutation } = useMutation({
    mutationFn: (formIdList: number[]) => getMergedFormPdf(formIdList),
    onSuccess: (data) => {
      downloadBlob(new Blob([data], { type: 'application/pdf' }), '원서모음.pdf');
    },
    onError: async (error: Parameters<typeof handleError>[0]) => {
      const errorData = error.response?.data;
      if (isAxiosError(error) && error.response && errorData instanceof Blob) {
        error.response.data = await errorData
          .text()
          .then(JSON.parse)
          .catch(() => errorData);
      }
      handleError(error);
    },
  });

  return { mergeFormPdf, ...restMutation };
};

export const useReceiveStatusChangeMutation = (formId: number, onClose: () => void) => {
  const { handleError } = useApiError();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate: changeReceiveStatus, ...restMutation } = useMutation({
    mutationFn: (status: ReceiveStatusValue) => patchReceiveStatus(formId, status),
    onSuccess: () => {
      toast('접수 상태가 변경되었습니다.', 'SUCCESS');
      queryClient.invalidateQueries({ queryKey: [KEY.FORM_LIST] });
      queryClient.invalidateQueries({ queryKey: [KEY.FORM_DETAIL, formId] });
      onClose();
    },
    onError: handleError,
  });

  return { changeReceiveStatus, ...restMutation };
};

export const useEditPaymentResultMutation = (
  paymentResultData: PatchPaymentResultReq,
) => {
  const { handleError } = useApiError();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const setIsPaymentResultEditing = useSetAtom(isPaymentResultEditingAtom);
  const setPaymentResult = useSetAtom(paymentResultAtom);

  const { mutate: editPaymentResult, ...restMutation } = useMutation({
    mutationFn: () => patchPaymentResult(paymentResultData),
    onSuccess: () => {
      toast('전형료 변경 여부가 반영되었습니다.', 'SUCCESS');
      queryClient.invalidateQueries({ queryKey: [KEY.FORM_LIST] });
      setIsPaymentResultEditing(false);
      setPaymentResult({});
    },
    onError: handleError,
  });

  return { editPaymentResult, ...restMutation };
};

export const useEditInterviewNumberMutation = (
  InterviewNumberData: PatchInterviewNumberReq,
) => {
  const { handleError } = useApiError();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const setIsInterviewNumberEditing = useSetAtom(isInterviewNumberEditingAtom);
  const setInterviewNumber = useSetAtom(interviewNumberAtom);

  const { mutate: editInterviewNumber, ...restMutation } = useMutation({
    mutationFn: () => patchInterviewNumber(InterviewNumberData),
    onSuccess: () => {
      toast('면접번호 변경여부가 반영되었습니다.', 'SUCCESS');
      queryClient.invalidateQueries({ queryKey: [KEY.FORM_LIST] });
      setIsInterviewNumberEditing(false);
      setInterviewNumber({});
    },
    onError: handleError,
  });

  return { editInterviewNumber, ...restMutation };
};
