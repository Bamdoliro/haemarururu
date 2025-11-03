import { color, font } from '@maru/design-system';
import { IconClose } from '@maru/icon';
import { Button, Column, Row, Text } from '@maru/ui';
import { flex } from '@maru/utils';
import { styled } from 'styled-components';
import { useRouter } from 'next/navigation';

interface BlockedSignUpModalProps {
  close: () => void;
}

const BlockedSignUpModal = ({ close }: BlockedSignUpModalProps) => {
  const router = useRouter();

  const handleClose = () => {
    close();
    router.push('/');
  };

  return (
    <BlurBackground>
      <StyledFairQuestionModal>
        <Column gap={20}>
          <Row justifyContent="space-between">
            <Text fontType="H2">원서 접수 기간이 아닙니다.</Text>
            <IconClose
              width={36}
              height={36}
              color={color.gray600}
              cursor="pointer"
              onClick={handleClose}
            />
          </Row>
          <Underline />
          <QuestionText>
            아직 원서 접수 기간이 아닙니다.
            <br />
            원서 접수 기간에 다시 시도해 주세요.
          </QuestionText>
        </Column>
        <Row justifyContent="flex-end">
          <Button size="SMALL" styleType="SECONDARY" width={60} onClick={handleClose}>
            닫기
          </Button>
        </Row>
      </StyledFairQuestionModal>
    </BlurBackground>
  );
};

export default BlockedSignUpModal;

const BlurBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1;
`;

const StyledFairQuestionModal = styled.div`
  ${flex({
    flexDirection: 'column',
    justifyContent: 'space-between',
  })}
  width: 600px;
  padding: 36px;
  min-height: 350px;

  border-radius: 16px;
  background: ${color.white};
`;

const Underline = styled.div`
  width: 100%;
  height: 1px;
  border-bottom: 1px solid ${color.gray200};
`;

const QuestionText = styled.div`
  width: 100%;
  max-height: 200px;
  white-space: pre-wrap;
  word-break: break-word;
  ${font.p2}
`;
