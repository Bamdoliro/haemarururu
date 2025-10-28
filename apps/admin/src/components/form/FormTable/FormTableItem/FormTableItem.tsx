import { TableItem } from '@/components/common';
import { ROUTES } from '@/constants/common/constant';
import { FORM_TYPE_CATEGORY } from '@/constants/form/constant';
import { useFormToPrintStore } from '@/store/form/formToPrint';
import { useIsFormToPrintSelectingValueStore } from '@/store/form/isFormToPrintSelecting';
import { useIsSecondRoundResultEditingValueStore } from '@/store/form/isSecondRoundResultEditing';
import { useSecondRoundResultStore } from '@/store/form/secondRoundResult';
import type { Form, PassStatusType, PaymentStatusType } from '@/types/form/client';
import { convertToResponsive, maskName } from '@/utils';
import { color } from '@maru/design-system';
import { CellInput, CheckBox, Dropdown, Row, Text } from '@maru/ui';
import { useRouter } from 'next/navigation';
import type { ChangeEventHandler } from 'react';
import { useState } from 'react';
import { styled } from 'styled-components';
import { usePaymentResultStore } from '@/store/form/paymentResult';
import { useIsPaymentResultEditingValueStore } from '@/store/form/isPaymentResultEditing';
import { useIsInterviewNumberEditingValueStore } from '@/store/form/isInterviewNumberEditing';
import { useInterviewNumberStore } from '@/store/form/interviewNumber';

const FormTableItem = ({
  id,
  examinationNumber,
  name,
  graduationType,
  school,
  status,
  type,
  hasDocument,
  payment,
  totalScore,
  firstRoundPassed,
  interviewNumber,
  secondRoundPassed,
}: Form) => {
  const router = useRouter();

  const isSecondRoundResultEditing = useIsSecondRoundResultEditingValueStore();
  const isInterviewNumberEditing = useIsInterviewNumberEditingValueStore();
  const isPaymentResultEditing = useIsPaymentResultEditingValueStore();
  const [secondRoundResult, setSecondRoundResult] = useSecondRoundResultStore();
  const [paymentResult, setPaymentResult] = usePaymentResultStore();
  const [interviewNumberResult, setInterviewNumberResult] = useInterviewNumberStore();
  const [isHovered, setIsHovered] = useState(false);

  const getDocumentType = (type: string): string => {
    if (type === 'REGULAR') {
      return '일반전형';
    }
    if (type === 'SPECIAL_ADMISSION' || type === 'NATIONAL_VETERANS_EDUCATION') {
      return `특례입학대상자전형 \n ${
        FORM_TYPE_CATEGORY[type as keyof typeof FORM_TYPE_CATEGORY]
      }`;
    }
    return `사회통합전형\n${FORM_TYPE_CATEGORY[type as keyof typeof FORM_TYPE_CATEGORY]}`;
  };

  const handleSecondPassResultDropdownChange = (value: string) => {
    setSecondRoundResult((prev) => ({
      ...prev,
      [id]: value as PassStatusType,
    }));
  };
  const handlePaymentDropdownChange = (value: string) => {
    setPaymentResult((prev) => ({
      ...prev,
      [id]: value as PaymentStatusType,
    }));
  };

  const handleInterviewNumberChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;
    setInterviewNumberResult((prev) => ({
      ...prev,
      [id]: value ? Number(value) : null,
    }));
  };
  const getStatusColor = (status: boolean | null) => {
    if (status === null) return color.gray600;
    return status ? color.haeMaruDefault : color.red;
  };

  const getRoundResult = (roundPassed: boolean | null, FormStatus?: string) => {
    if (FormStatus === 'NO_SHOW') {
      return '불참';
    }
    return roundPassed === null ? '미정' : roundPassed ? '합격' : '불합격';
  };
  const getPaymentResult = (payment: boolean | null) => {
    return payment ? '제출' : '미제출';
  };
  const getDocumentStatus = (documentStatus: boolean | null, FormStatus?: string) => {
    if (FormStatus === 'REJECTED') return '반려';
    else if (FormStatus === 'APPROVED') return '승인';
    else if (documentStatus) return '학교도착';
    return '미도착';
  };
  const getDocumentColor = (documentStatus: boolean | null, FormStatus?: string) => {
    if (FormStatus === 'REJECTED') return color.red;
    else if (FormStatus === 'APPROVED') return color.maruDefault;
    return color.gray600;
  };

  const isFormToPrintSelecting = useIsFormToPrintSelectingValueStore();
  const [formToPrint, setFormToPrint] = useFormToPrintStore();

  const handleFormToPrintSelectChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { checked } = e.target;
    setFormToPrint((prev) => ({ ...prev, [id]: checked }));
  };

  const isDisabled =
    isSecondRoundResultEditing ||
    isFormToPrintSelecting ||
    isPaymentResultEditing ||
    isInterviewNumberEditing;
  const handleMoveFormDetailPage = () => {
    if (isDisabled) return;
    router.push(`${ROUTES.FORM}/${id}`);
  };

  return (
    <DirectButton
      style={{
        cursor: isDisabled ? 'default' : 'pointer',
      }}
      onClick={handleMoveFormDetailPage}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <TableItem key={id}>
        <Row gap={48} alignItems="center">
          {isFormToPrintSelecting ? (
            <CheckBox
              checked={formToPrint[id]}
              onChange={handleFormToPrintSelectChange}
            />
          ) : null}
          <Text fontType="p2" width={convertToResponsive(40, 60)}>
            {examinationNumber}
          </Text>
          <Text fontType="p2" width={convertToResponsive(40, 60)}>
            {isHovered ? name : maskName(name)}
          </Text>
          <Text fontType="p2" width={convertToResponsive(120, 160)}>
            {graduationType === 'QUALIFICATION_EXAMINATION' ? '검정고시' : school}
          </Text>
          <Text fontType="p2" width={convertToResponsive(180, 240)} whiteSpace="pre-line">
            {getDocumentType(type)}
          </Text>
        </Row>
        <Row gap={48} justify-content="flex-end" alignItems="center">
          {isPaymentResultEditing ? (
            <Dropdown
              name="payment"
              size="SMALL"
              width={100}
              value={paymentResult[id] || getPaymentResult(payment)}
              data={['제출', '미제출']}
              onChange={handlePaymentDropdownChange}
            />
          ) : (
            <Text
              fontType="p2"
              width={convertToResponsive(40, 60)}
              color={getStatusColor(payment)}
            >
              {getPaymentResult(payment)}
            </Text>
          )}
          <Text fontType="p2" width={convertToResponsive(40, 60)}>
            {status === 'SUBMITTED' ? '초안 제출' : '최종 제출'}
          </Text>
          <Text
            fontType="p2"
            width={convertToResponsive(40, 60)}
            color={getDocumentColor(hasDocument, status)}
          >
            {getDocumentStatus(hasDocument, status)}
          </Text>
          <Text
            fontType="p2"
            width={convertToResponsive(40, 60)}
            color={getStatusColor(firstRoundPassed)}
          >
            {getRoundResult(firstRoundPassed)}
          </Text>
          {isInterviewNumberEditing ? (
            <CellInput
              width={80}
              name="interviewNumber"
              maxLength={5}
              value={interviewNumberResult[id] ?? interviewNumber ?? ''}
              onChange={handleInterviewNumberChange}
            />
          ) : (
            <Text fontType="p2" width={convertToResponsive(40, 60)}>
              {interviewNumber ?? '-'}
            </Text>
          )}
          <Text
            fontType="p2"
            width={convertToResponsive(40, 60)}
            color={typeof totalScore !== 'number' ? color.gray600 : color.black}
          >
            {typeof totalScore !== 'number' ? '미정' : Number(totalScore.toFixed(3))}
          </Text>
        </Row>
        <Row>
          {isSecondRoundResultEditing ? (
            <Dropdown
              name="pass"
              size="SMALL"
              width={100}
              value={secondRoundResult[id] || getRoundResult(secondRoundPassed, status)}
              data={['합격', '불합격']}
              onChange={handleSecondPassResultDropdownChange}
            />
          ) : (
            <Text
              fontType="p2"
              width={convertToResponsive(40, 60)}
              color={getStatusColor(secondRoundPassed)}
            >
              {getRoundResult(secondRoundPassed, status)}
            </Text>
          )}
        </Row>
      </TableItem>
    </DirectButton>
  );
};

export default FormTableItem;

const DirectButton = styled.button`
  text-align: start;
`;
