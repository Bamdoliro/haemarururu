import { FormController, GradeCalculator } from '@/components/form';
import { Column, Text, UnderlineButton } from '@maru/ui';
import styled from '@emotion/styled';
import { useCTAButton } from './Score.hook';
import { color } from '@maru/design-system';

const Score = () => {
  const { handleNextStep, handlePreviousStep, subjectError } = useCTAButton();

  return (
    <>
      <Column gap={24}>
        <NavigationBar>
          <UnderlineButton active={true}>교과 성적</UnderlineButton>
        </NavigationBar>
        <Text fontType="p3" color={color.red}>
          *집중이수제 등으로 일부 교과 성적이 없는 경우와 자유학기제로 인해 한 학기/학년
          교과 성적이 없는 경우에는 입학요강을 기준으로 교과 성적을 대체함
          <br />
          *학기에 사회 점수가 없을 경우 역사의 점수로 표시바랍니다.
        </Text>
        <GradeCalculator option="FORM" subjectError={subjectError} />
      </Column>
      <FormController
        onNext={handleNextStep}
        onPrevious={handlePreviousStep}
        step="성적입력"
      />
    </>
  );
};

export default Score;

const NavigationBar = styled.div`
  width: 100%;
`;
