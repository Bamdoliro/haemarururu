import { useFormValueStore } from '@/stores';
import { Column, Input, Row, Text } from '@maru/ui';
import ProfileUploader from '../../ProfileUploader/ProfileUploader';
import FormController from '../../FormController/FormController';
import { useApplicantForm } from './ApplicantInformationContent.hook';
import { color } from '@maru/design-system';
import { useEffect, useRef, useState } from 'react';

const ApplicantInformationContent = () => {
  const { onFieldChange, handleNextStep, errors, RRNBack, RRNFront } = useApplicantForm();
  const form = useFormValueStore();

  const frontRef = useRef<HTMLInputElement>(null);
  const backRef = useRef<HTMLInputElement>(null);
  const [showBack, setShowBack] = useState(false);

  useEffect(() => {
    if ((RRNFront ?? '').replace(/\D/g, '').length === 6) {
      setTimeout(() => backRef.current?.focus(), 0);
    }
  }, [RRNFront]);

  const handleFrontChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    onFieldChange(e);
    const v = e.target.value.replace(/\D/g, '');
    if (v.length >= 6) backRef.current?.focus();
  };

  const guardBack = (e?: React.SyntheticEvent | Event) => {
    if (RRNFront.length < 6) {
      e?.preventDefault?.();
      e?.stopPropagation?.();
      setTimeout(() => frontRef.current?.focus(), 0);
      return true;
    }
    return false;
  };

  const handleBackMouseDown: React.MouseEventHandler<HTMLInputElement> = (e) => {
    guardBack(e);
  };

  const handleBackTouchStart: React.TouchEventHandler<HTMLInputElement> = (e) => {
    guardBack(e);
  };

  const handleBackBeforeInput: React.FormEventHandler<HTMLInputElement> = (e) => {
    if (guardBack(e)) return;
  };

  const handleBackPaste: React.ClipboardEventHandler<HTMLInputElement> = (e) => {
    guardBack(e);
  };

  const handleBackKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (RRNFront.length < 6) {
      guardBack(e);
      return;
    }
    if (e.key === 'Backspace' && RRNBack.length === 0) {
      e.preventDefault();
      frontRef.current?.focus();
    }
  };

  return (
    <>
      <Row width="100%" justifyContent="space-between">
        <Column gap={40} alignItems="center">
          <ProfileUploader name="profile" isError={!!errors.profile?.length} />
        </Column>
        <Column gap={30} width={492}>
          <Input
            label="성명"
            value={form.applicant.name}
            onChange={onFieldChange}
            name="name"
            placeholder="예) 홍길동"
            width="100%"
            isError={!!errors.name?.length}
            errorMessage={errors.name ? errors.name[0] : ''}
          />
          <Row gap={12} alignItems="center">
            <Input
              label="주민등록번호"
              name="registrationNumberFront"
              value={RRNFront}
              onChange={handleFrontChange}
              placeholder="앞자리를 입력해 주세요."
              width="100%"
              maxLength={6}
              inputMode="numeric"
              isError={!!errors.registrationNumberFront?.length}
              errorMessage={
                errors.registrationNumberFront ? errors.registrationNumberFront[0] : ''
              }
              autoComplete="off"
              ref={frontRef}
            />
            <Text fontType="H4" color={color.gray900} textAlign="center">
              ㅤ<br />-
            </Text>
            <Input
              label="ㅤ"
              name="registrationNumberBack"
              value={RRNBack}
              onChange={onFieldChange}
              placeholder="뒷자리를 입력해 주세요."
              width="100%"
              maxLength={7}
              inputMode="numeric"
              isError={!!errors.registrationNumberBack?.length}
              errorMessage={
                errors.registrationNumberBack ? errors.registrationNumberBack[0] : ''
              }
              autoComplete="off"
              readOnly={(RRNFront ?? '').replace(/\D/g, '').length < 6}
              type={showBack ? 'text' : 'password'}
              onMouseEnter={() => setShowBack(true)}
              onMouseLeave={() => setShowBack(false)}
              onFocus={(e) => {
                if (guardBack(e)) return;
              }}
              onMouseDown={handleBackMouseDown}
              onTouchStart={handleBackTouchStart}
              onBeforeInput={handleBackBeforeInput}
              onPaste={handleBackPaste}
              onKeyDown={handleBackKeyDown}
              ref={backRef}
            />
          </Row>
          <Input
            label="전화번호"
            value={form.applicant.phoneNumber}
            onChange={onFieldChange}
            name="phoneNumber"
            placeholder="- 없이 입력해주세요."
            width="100%"
            isError={!!errors.phoneNumber?.length}
            errorMessage={errors.phoneNumber ? errors.phoneNumber[0] : ''}
          />
        </Column>
      </Row>
      <FormController onNext={handleNextStep} step="지원자정보" />
    </>
  );
};

export default ApplicantInformationContent;
