import {
  useEditInterviewNumberMutation,
  useEditPaymentResultMutation,
  useEditSecondRoundResultMutation,
  useMergeFormPdfMutation,
  usePrintFormUrlMutation,
} from '@/services/form/mutations';
import { useToast } from '@maru/hooks';
import {
  useDocumentExportJobQuery,
  useExportAllAdmissionTicket,
} from '@/services/form/queries';
import {
  getFormExportPersonalStatementSheet,
  postDocumentExportJob,
} from '@/services/form/api';
import { KEY } from '@/constants/common/constant';
import { downloadBlob } from '@/utils';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import type { FormListSortingType } from '@/types/form/client';
import {
  formListSortingTypeAtom,
  formListTypeAtom,
  formToPrintAtom,
  interviewNumberAtom,
  isFormToPrintSelectingAtom,
  isInterviewNumberEditingAtom,
  isPaymentResultEditingAtom,
  isSecondRoundResultEditingAtom,
  paymentResultAtom,
  secondRoundResultAtom,
} from '@/store';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';

export const useFormPageState = () => {
  const [formListType, setFormListType] = useAtom(formListTypeAtom);
  const [formListSortingType, setFormListSortingType] = useAtom(formListSortingTypeAtom);

  const handleCriteriaChange = (value: string, key: string) => {
    if (value === 'RESET') {
      setFormListType('모두 보기');
      setFormListSortingType((prev) => ({ ...prev, [key]: null }));
    } else if (value === 'ALL') {
      setFormListType('전체 조회');
      setFormListSortingType((prev) => ({ ...prev, [key]: null }));
    } else {
      setFormListType('정렬');
      setFormListSortingType((prev) => ({ ...prev, [key]: value }));
    }
  };

  const handleFormListTypeAll = () => setFormListType('모두 보기');
  const handleFormListTypeReview = () => setFormListType('검토해야 하는 원서 모아보기');

  const getCriteriaDropdownValue = (
    key: keyof FormListSortingType,
    category: Record<string, string>,
  ) => {
    const value = formListSortingType[key];
    return value ? category[value] : undefined;
  };

  return {
    formListType,
    handleCriteriaChange,
    handleFormListTypeReview,
    handleFormListTypeAll,
    getCriteriaDropdownValue,
  };
};

export const useEditSecondRoundResultActions = () => {
  const [isSecondRoundResultEditing, setIsSecondRoundResultEditing] = useAtom(
    isSecondRoundResultEditingAtom,
  );

  const setIsSecondRoundResultEditingTrue = () => setIsSecondRoundResultEditing(true);
  const setIsSecondRoundResultEditingFalse = () => {
    setIsSecondRoundResultEditing(false);
  };

  const secondRoundResult = useAtomValue(secondRoundResultAtom);
  const secondRoundResultData = {
    formList: Object.entries(secondRoundResult).map(([formId, passStatus]) => {
      return {
        formId: Number(formId),
        pass: passStatus === '미정' ? null : passStatus === '합격',
      };
    }),
  };
  const { editSecondRoundResult } =
    useEditSecondRoundResultMutation(secondRoundResultData);

  const handleSecondRoundResultEditCompleteButtonClick = () => {
    editSecondRoundResult();
  };

  return {
    isSecondRoundResultEditing,
    setIsSecondRoundResultEditingTrue,
    setIsSecondRoundResultEditingFalse,
    handleSecondRoundResultEditCompleteButtonClick,
  };
};

export const usePrintFormURLActions = () => {
  const [isFormToPrintSelecting, setIsFormToPrintSelecting] = useAtom(
    isFormToPrintSelectingAtom,
  );
  const setFormToPrint = useSetAtom(formToPrintAtom);

  const setIsFormToPrintSelectingTrue = () => {
    setIsFormToPrintSelecting(true);
  };
  const setIsFormToPrintSelectingFalse = () => {
    setIsFormToPrintSelecting(false);
    setFormToPrint({});
  };

  const formToPrint = useAtomValue(formToPrintAtom);
  const formIdList = Object.entries(formToPrint).reduce(
    (acc: number[], [formId, isSelected]) =>
      isSelected ? [...acc, Number(formId)] : acc,
    [],
  );
  const { printFormUrl } = usePrintFormUrlMutation();
  const handlePrintFormUrlButtonClick = () => {
    const check = window.open('');
    check?.close();
    printFormUrl(formIdList);
  };

  const { toast } = useToast();
  const { mergeFormPdf, isPending: isMergeFormPdfPending } = useMergeFormPdfMutation();
  const handleMergeFormPdfButtonClick = () => {
    if (formIdList.length === 0) {
      toast('병합할 원서를 선택해주세요.', 'ERROR');
      return;
    }
    mergeFormPdf(formIdList);
  };

  return {
    isFormToPrintSelecting,
    setIsFormToPrintSelectingTrue,
    setIsFormToPrintSelectingFalse,
    handlePrintFormUrlButtonClick,
    handleMergeFormPdfButtonClick,
    isMergeFormPdfPending,
  };
};

export const useExportAllAdmissionTicketAction = () => {
  const { toast } = useToast();
  const { refetch: fetchAllAdmissionTicket, isFetching: isExportingAdmissionTicket } =
    useExportAllAdmissionTicket();

  const handleExportAllAdmissionTicketButtonClick = async () => {
    if (isExportingAdmissionTicket) return;

    const { data, isError } = await fetchAllAdmissionTicket();

    if (isError || !data) {
      toast('수험표 발급에 실패했습니다.', 'ERROR');
      return;
    }

    downloadBlob(new Blob([data]), '전체 접수증.pdf');
  };

  return { handleExportAllAdmissionTicketButtonClick, isExportingAdmissionTicket };
};

const PERSONAL_STATEMENT_EXPORT_JOB_ID_KEY = 'personalStatementExportJobId';

const getStoredExportJobId = () => {
  const storedJobId = Number(localStorage.getItem(PERSONAL_STATEMENT_EXPORT_JOB_ID_KEY));
  return Number.isInteger(storedJobId) && storedJobId > 0 ? storedJobId : null;
};

const downloadFromUrl = (url: string, fileName: string) => {
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
};

export const useExportAllPersonalStatementAction = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [isStartingExport, setIsStartingExport] = useState(false);
  const [exportJobId, setExportJobId] = useState<number | null>(null);

  const { data: exportJob, isError: isExportJobError } =
    useDocumentExportJobQuery(exportJobId);

  const updateExportJobId = (jobId: number | null) => {
    if (jobId === null) localStorage.removeItem(PERSONAL_STATEMENT_EXPORT_JOB_ID_KEY);
    else localStorage.setItem(PERSONAL_STATEMENT_EXPORT_JOB_ID_KEY, String(jobId));
    setExportJobId(jobId);
  };

  useEffect(() => {
    setExportJobId(getStoredExportJobId());
  }, []);

  useEffect(() => {
    if (isExportJobError) {
      toast('자기소개서 발급 상태를 확인하지 못했습니다.', 'ERROR');
      updateExportJobId(null);
      return;
    }

    if (exportJob?.status === 'COMPLETED') {
      if (exportJob.downloadUrl) {
        downloadFromUrl(exportJob.downloadUrl, '전체 자기소개서.pdf');
      } else {
        toast('자기소개서 다운로드 링크를 찾을 수 없습니다.', 'ERROR');
      }
      updateExportJobId(null);
    } else if (exportJob?.status === 'FAILED') {
      toast(exportJob.errorMessage ?? '자기소개서 발급에 실패했습니다.', 'ERROR');
      updateExportJobId(null);
    }
  }, [exportJob, isExportJobError, toast]);

  const isExportingPersonalStatement = isStartingExport || exportJobId !== null;

  const handleExportAllPersonalStatementButtonClick = async () => {
    if (isExportingPersonalStatement) return;
    setIsStartingExport(true);

    const [exportJobResult, personalStatementSheetResult] = await Promise.allSettled([
      postDocumentExportJob(),
      queryClient.fetchQuery({
        queryKey: [KEY.FORM_EXPORT_PERSONAL_STATEMENT_SHEET],
        queryFn: getFormExportPersonalStatementSheet,
      }),
    ]);

    if (exportJobResult.status === 'fulfilled') {
      updateExportJobId(exportJobResult.value.data.id);
    } else {
      toast('자기소개서 발급에 실패했습니다.', 'ERROR');
    }

    if (personalStatementSheetResult.status === 'fulfilled') {
      downloadBlob(new Blob([personalStatementSheetResult.value]), '자기소개서.xlsx');
    } else {
      toast('자기소개서 엑셀 발급에 실패했습니다.', 'ERROR');
    }

    setIsStartingExport(false);
  };

  return { handleExportAllPersonalStatementButtonClick, isExportingPersonalStatement };
};

export const useEditPaymentResultActions = () => {
  const [isPaymentResultEditing, setIsPaymentResultEditing] = useAtom(
    isPaymentResultEditingAtom,
  );

  const setIsPaymentResultEditingTrue = () => setIsPaymentResultEditing(true);
  const setIsPaymentResultEditingFalse = () => {
    setIsPaymentResultEditing(false);
  };

  const paymentResult = useAtomValue(paymentResultAtom);
  const paymentResultData = {
    formList: Object.entries(paymentResult).map(([formId, paidStatus]) => {
      return {
        formId: Number(formId),
        paid: paidStatus === '미제출' ? null : paidStatus === '제출',
      };
    }),
  };
  const { editPaymentResult } = useEditPaymentResultMutation(paymentResultData);

  const handlePaymentResultEditCompleteButtonClick = () => {
    editPaymentResult();
  };

  return {
    isPaymentResultEditing,
    setIsPaymentResultEditingTrue,
    setIsPaymentResultEditingFalse,
    handlePaymentResultEditCompleteButtonClick,
  };
};

export const useEditInterviewNumberActions = () => {
  const [isInterviewNumberResultEditing, setIsInterviewNumberResultEditing] = useAtom(
    isInterviewNumberEditingAtom,
  );

  const setIsInterviewNumberResultEditingTrue = () =>
    setIsInterviewNumberResultEditing(true);
  const setIsInterviewNumberResultEditingFalse = () => {
    setIsInterviewNumberResultEditing(false);
  };

  const interviewNumberResult = useAtomValue(interviewNumberAtom);
  const interviewNumberData = {
    formList: Object.entries(interviewNumberResult).map(([formId, interviewNumber]) => {
      return {
        formId: Number(formId),
        interviewNumber:
          interviewNumber && interviewNumber !== '' ? interviewNumber : null,
      };
    }),
  };
  const { editInterviewNumber } = useEditInterviewNumberMutation(interviewNumberData);

  const handleInterviewNumberResultEditCompleteButtonClick = () => {
    editInterviewNumber();
  };

  return {
    isInterviewNumberResultEditing,
    setIsInterviewNumberResultEditingTrue,
    setIsInterviewNumberResultEditingFalse,
    handleInterviewNumberResultEditCompleteButtonClick,
  };
};
