import { color } from '@maru/design-system';
import { Button, Input, Loader, Text } from '@maru/ui';
import { flex } from '@maru/utils';
import styled from '@emotion/styled';
import { SCHEDULE_FIELDS, SCHEDULE_INPUT_MAX } from '@/constants/schedule/constant';
import { useScheduleForm } from './ScheduleForm.hooks';

const ScheduleForm = () => {
  const {
    schedule,
    form,
    errors,
    isLoading,
    isError,
    isPending,
    handleChange,
    handleReset,
    handleSubmit,
  } = useScheduleForm();

  if (isLoading) return <Loader />;

  if (isError || !schedule) {
    return (
      <Text fontType="p2" color={color.gray600}>
        현재 입학 일정을 불러오지 못했습니다.
      </Text>
    );
  }

  return (
    <StyledScheduleForm>
      <Text fontType="H4" color={color.gray900}>
        {schedule.admissionYear}학년도 입학 일정
      </Text>
      <StyledFieldGrid>
        {SCHEDULE_FIELDS.map(({ key, label, type, optional }) => (
          <Input
            key={key}
            width="100%"
            type={type}
            name={key}
            max={SCHEDULE_INPUT_MAX[type]}
            label={
              <>
                {label}
                {optional ? (
                  <StyledOptionalMark> (선택)</StyledOptionalMark>
                ) : (
                  <StyledRequiredMark> *</StyledRequiredMark>
                )}
              </>
            }
            value={form[key]}
            onChange={(e) => handleChange(key, e.target.value)}
            isError={Boolean(errors[key])}
            errorMessage={errors[key]}
            style={errors[key] ? { paddingRight: 48 } : undefined}
          />
        ))}
      </StyledFieldGrid>
      <StyledFooter>
        <Text fontType="p3" color={color.gray600}>
          점검 일정은 비워두면 점검이 설정되지 않습니다.
        </Text>
        <StyledButtonBox>
          <Button styleType="SECONDARY" onClick={handleReset} disabled={isPending}>
            되돌리기
          </Button>
          <Button onClick={handleSubmit} disabled={isPending}>
            일정 수정하기
          </Button>
        </StyledButtonBox>
      </StyledFooter>
    </StyledScheduleForm>
  );
};

export default ScheduleForm;

const StyledScheduleForm = styled.div`
  ${flex({ flexDirection: 'column' })}
  gap: 32px;
  width: 100%;
  max-width: 800px;
  padding: 40px;
  background-color: ${color.gray50};
  border: 1px solid ${color.gray250};
  border-radius: 12px;
`;

const StyledFieldGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px 32px;
  width: 100%;
`;

const StyledFooter = styled.div`
  ${flex({ alignItems: 'center', justifyContent: 'space-between' })}
  gap: 16px;
  width: 100%;
`;

const StyledButtonBox = styled.div`
  ${flex({ alignItems: 'center' })}
  gap: 12px;
`;

const StyledRequiredMark = styled.span`
  color: ${color.red};
`;

const StyledOptionalMark = styled.span`
  color: ${color.gray500};
`;
