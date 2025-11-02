import { useAutoSecondRoundResultMutation } from '@/services/form/mutations';
import { color } from '@maru/design-system';
import { IconClose } from '@maru/icon';
import { Button, Column, Row, Text } from '@maru/ui';
import { flex } from '@maru/utils';
import styled from 'styled-components';

interface AutoSecondRoundResultModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AutoSecondRoundResultModal = ({
  isOpen,
  onClose,
}: AutoSecondRoundResultModalProps) => {
  const { autoSecondRoundResult } = useAutoSecondRoundResultMutation();

  const handleAutoSecondRoundResult = () => {
    autoSecondRoundResult();
    onClose();
  };

  const handleCloseModal = () => {
    onClose();
  };

  return (
    <BlurBackground isOpen={isOpen}>
      <StyledAutoSecondRoundResultModal>
        <Column width="100%" gap={20} alignItems="flex-start">
          <Row width="100%" justifyContent="space-between">
            <Text fontType="H2" color={color.gray900}>
              면접 합격자 자동 선발
            </Text>
            <IconClose
              width={36}
              height={36}
              color={color.gray600}
              cursor="pointer"
              onClick={handleCloseModal}
            />
          </Row>
          <Line />
          <Text fontType="p2" color={color.gray900}>
            면접 합격자 자동 선발을 진행하시겠습니까?
          </Text>
        </Column>
        <Row justifyContent="flex-end" alignItems="flex-start" gap="16px">
          <Button size="SMALL" styleType="SECONDARY" onClick={handleCloseModal}>
            취소
          </Button>
          <Button size="SMALL" styleType="PRIMARY" onClick={handleAutoSecondRoundResult}>
            자동 선발
          </Button>
        </Row>
      </StyledAutoSecondRoundResultModal>
    </BlurBackground>
  );
};

export default AutoSecondRoundResultModal;

const BlurBackground = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  display: ${(props) => (props.isOpen ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1;
`;

const StyledAutoSecondRoundResultModal = styled.div`
  ${flex({
    flexDirection: 'column',
    justifyContent: 'space-between',
  })}
  width: 600px;
  min-height: 350px;
  padding: 36px;
  border-radius: 16px;
  background: ${color.white};
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background: ${color.gray200};
`;
