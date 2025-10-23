import {
  useEditInterviewNumberMutation,
  useEditPaymentResultMutation,
  useEditSecondRoundResultMutation,
  usePrintFormUrlMutation,
} from '@/services/form/mutations';
import {
  useExportAllAddmissionTicket,
  useExportAllPersonalStatement,
} from '@/services/form/queries';
import {
  useFormToPrintValueStore,
  useSetFormToPrintStore,
} from '@/store/form/formToPrint';
import { useFormListSortingTypeStore, useFormListTypeStore } from '@/store/form/formType';
import { useIsFormToPrintSelectingStore } from '@/store/form/isFormToPrintSelecting';
import { useIsSecondRoundResultEditingStore } from '@/store/form/isSecondRoundResultEditing';
import { useSecondRoundResultValueStore } from '@/store/form/secondRoundResult';
import type { FormListSortingType } from '@/types/form/client';
import { usePaymentResultValueStore } from '@/store/form/paymentResult';
import { useIsPaymentResultEditingStore } from '@/store/form/isPaymentResultEditing';
import { useIsInterviewNumberEditingStore } from '@/store/form/isInterviewNumberEditing';
import { useInterviewNumberValueStore } from '@/store/form/interviewNumber';

export const useFormPageState = () => {
  const [formListType, setFormListType] = useFormListTypeStore();
  const [formListSortingType, setFormListSortingType] = useFormListSortingTypeStore();

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
    category: Record<string, string>
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
  const [isSecondRoundResultEditing, setIsSecondRoundResultEditing] =
    useIsSecondRoundResultEditingStore();

  const setIsSecondRoundResultEditingTrue = () => setIsSecondRoundResultEditing(true);
  const setIsSecondRoundResultEditingFalse = () => {
    setIsSecondRoundResultEditing(false);
  };

  const secondRoundResult = useSecondRoundResultValueStore();
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
  const [isFormToPrintSelecting, setIsFormToPrintSelecting] =
    useIsFormToPrintSelectingStore();
  const setFormToPrint = useSetFormToPrintStore();

  const setIsFormToPrintSelectingTrue = () => {
    setIsFormToPrintSelecting(true);
  };
  const setIsFormToPrintSelectingFalse = () => {
    setIsFormToPrintSelecting(false);
    setFormToPrint({});
  };

  const formToPrint = useFormToPrintValueStore();
  const formIdList = Object.entries(formToPrint).reduce(
    (acc: number[], [formId, isSelected]) =>
      isSelected ? [...acc, Number(formId)] : acc,
    []
  );
  const { printFormUrl } = usePrintFormUrlMutation();
  const handlePrintFormUrlButtonClick = () => {
    const check = window.open('');
    check?.close();
    printFormUrl(formIdList);
  };

  return {
    isFormToPrintSelecting,
    setIsFormToPrintSelectingTrue,
    setIsFormToPrintSelectingFalse,
    handlePrintFormUrlButtonClick,
  };
};

export const useExportAllAddmissionTicketAction = () => {
  const { data: exportTicketData } = useExportAllAddmissionTicket();

  const handleExportAllAdmissionTicketButtonClick = () => {
    if (!exportTicketData) return;
    const ticketURL = window.URL.createObjectURL(new Blob([exportTicketData]));

    const link = document.createElement('a');
    link.href = ticketURL;
    link.download = '전체 접수증.pdf';
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(ticketURL);
  };

  return { handleExportAllAdmissionTicketButtonClick };
};

export const useExportAllPersonalStatementAction = () => {
  const { data: exportPersonalStatementData } = useExportAllPersonalStatement();

  const handleExportAllPersonalStatementButtonClick = () => {
    if (!exportPersonalStatementData) return;
    const statementURL = window.URL.createObjectURL(
      new Blob([exportPersonalStatementData])
    );

    const link = document.createElement('a');
    link.href = statementURL;
    link.download = '전체 자기소개서.pdf';
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(statementURL);
  };

  return { handleExportAllPersonalStatementButtonClick };
};

export const useEditPaymentResultActions = () => {
  const [isPaymentResultEditing, setIsPaymentResultEditing] =
    useIsPaymentResultEditingStore();

  const setIsPaymentResultEditingTrue = () => setIsPaymentResultEditing(true);
  const setIsPaymentResultEditingFalse = () => {
    setIsPaymentResultEditing(false);
  };

  const paymentResult = usePaymentResultValueStore();
  const paymentResultData = {
    formList: Object.entries(paymentResult).map(([formId, paidStatus]) => {
      return {
        formId: Number(formId),
        payment: paidStatus === '미제출' ? null : paidStatus === '제출',
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
  const [isInterviewNumberResultEditing, setIsInterviewNumberResultEditing] =
    useIsInterviewNumberEditingStore();

  const setIsInterviewNumberResultEditingTrue = () =>
    setIsInterviewNumberResultEditing(true);
  const setIsInterviewNumberResultEditingFalse = () => {
    setIsInterviewNumberResultEditing(false);
  };

  const interviewNumberResult = useInterviewNumberValueStore();
  const interviewNumberData = {
    formList: Object.entries(interviewNumberResult).map(([formId, interviewNumber]) => {
      return {
        formId: Number(formId),
        interviewNumber: interviewNumber ? Number(interviewNumber) : null,
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
