import { color } from '@maru/design-system';
import { IconCalendar, IconClock } from '@maru/icon';
import { Button, Column, IconInput, RadioGroup, Text } from '@maru/ui';
import FormInput from '@maru/ui/src/Input/FormInput';
import { flex } from '@maru/utils';
import styled from '@emotion/styled';
import { useEditFairForm } from './editFairForm.hooks';
import formatTimeInput from '@/utils/functions/formatTimeInput';
import formatDateInput from '@/utils/functions/formatDateInput';
import type { FairType } from '@/types/fair/client';

interface EditFairFormProps {
  id: number;
}

const EditFairForm = ({ id }: EditFairFormProps) => {
  const {
    handleDeleteFair,
    handleEditFair,
    handleInputChange,
    handleDateChange,
    handleTimeChange,
    handleChange,
    editFair,
  } = useEditFairForm(id);

  return (
    <StyledEditFairForm>
      <Column gap={24} alignItems="flex-start" width="100%">
        <RadioGroup
          name="type"
          value={editFair.type}
          onChange={(e) => handleChange('type', e.target.value as FairType)}
          items={[
            { label: '학생/학부모', value: 'STUDENT_AND_PARENT' },
            { label: '교사', value: 'TEACHER' },
          ]}
          label="대상 선택"
        />
        <FormInput
          label="장소"
          placeholder="장소를 입력해주세요."
          name="place"
          value={editFair.place}
          onChange={handleInputChange}
        />
        <IconInput
          label="입학 설명회 날짜 (8자리)"
          placeholder="날짜를 입력해주세요."
          name="start-date"
          value={formatDateInput(editFair.start.slice(0, 8))}
          onChange={(e) => handleDateChange(e.target.value)}
          inputMode="numeric"
          icon={IconCalendar}
        />
        <IconInput
          label="시간 (4자리)"
          placeholder="시간을 입력해주세요."
          name="start-time"
          value={formatTimeInput(editFair.start.slice(8))}
          onChange={(e) => handleTimeChange(e.target.value)}
          icon={IconClock}
        />
        <FormInput
          label="신청 인원 (정원)"
          placeholder="인원을 입력해주세요."
          name="capacity"
          value={editFair.capacity}
          onChange={handleInputChange}
        />
        <CreateInputSort>
          <FormInput
            label="신청 기한 (8자리)"
            placeholder="시작일"
            name="applicationStartDate"
            value={formatDateInput(editFair.applicationStartDate ?? '')}
            onChange={handleInputChange}
            width="50%"
          />
          <FormInput
            placeholder="종료일"
            name="applicationEndDate"
            value={formatDateInput(editFair.applicationEndDate ?? '')}
            onChange={handleInputChange}
            width="50%"
          />
        </CreateInputSort>
      </Column>
      <ButtonWrapper>
        <Button styleType="WARNING" size="LARGE" onClick={handleDeleteFair}>
          <Text fontType="btn1">삭제하기</Text>
        </Button>
        <Button size="LARGE" onClick={handleEditFair}>
          <Text fontType="btn1">변경사항 저장하기</Text>
        </Button>
      </ButtonWrapper>
    </StyledEditFairForm>
  );
};

export default EditFairForm;

const StyledEditFairForm = styled.div`
  ${flex({
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  })};
  width: 500px;
  height: 804px;
  background-color: ${color.gray50};
  border-radius: 12px;
  border: 1px solid ${color.gray250};
  padding: 56px 70px;
`;

const ButtonWrapper = styled.div`
  ${flex({ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' })}
  gap: 10px;
  width: 100%;
  padding-top: 8.5%;
`;

const CreateInputSort = styled.div`
  ${flex({ alignItems: 'flex-end', justifyContent: 'space-between' })};
  gap: 10px;

  & > * {
    flex: 1;
    max-width: 100%;
  }
`;
