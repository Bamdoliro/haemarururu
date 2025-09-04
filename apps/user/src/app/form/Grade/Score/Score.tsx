import { FormController, GradeCalculator } from '@/components/form';
import { Column, Text, UnderlineButton } from '@maru/ui';
import { styled } from 'styled-components';
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
          *국어•영어•수학에서 미이수 입력 시 자동으로 성적이 C로 처리됩니다.
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
