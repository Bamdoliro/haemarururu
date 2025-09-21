import { color } from '@maru/design-system';
import { IconClose } from '@maru/icon';
import { Button, Column, Row, Text } from '@maru/ui';
import { flex } from '@maru/utils';
import type { ChangeEventHandler } from 'react';
import { useState } from 'react';
import { css, styled } from 'styled-components';
import { useChangeFinalStatusAction } from './ChangeFinalStatusModal.hook';

interface Props {
  id: number;
  isOpen: boolean;
  onClose: () => void;
}

const ChangeFinalStatusModal = ({ id, isOpen, onClose }: Props) => {
  const [approvalStatus, setApprovalStatus] = useState<string | ''>('');

  const handleApprovalRadioChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setApprovalStatus(e.target.value);
  };

  const { handleChangeFinalStatusButtonClick } = useChangeFinalStatusAction(
    id,
    approvalStatus,
    onClose
  );

  return (
    <BlurBackground $isOpen={isOpen}>
      <StyledChangeFinalStatusModal>
        <Row justifyContent="space-between">
          <Column gap={8}>
            <Text fontType="H2" color={color.gray900}>
              최종 접수 확인
            </Text>
            <Text fontType="p3" color={color.gray600}>
              지원자의 원서와 증빙서류를 확인해주시기 바랍니다.
            </Text>
          </Column>
          <IconClose
            width={36}
            height={36}
            color={color.gray600}
            cursor="pointer"
            onClick={onClose}
          />
        </Row>
        <Row gap={12}>
          <CardRadio approvalStatusType="승인" $checked={approvalStatus === '승인'}>
            <Text
              fontType="context"
              color={approvalStatus === '승인' ? color.haeMaruDefault : color.gray600}
            >
              승인
            </Text>
            <input
              type="radio"
              name="approvalStatus"
              value="승인"
              onChange={handleApprovalRadioChange}
              hidden
            />
          </CardRadio>
          <CardRadio approvalStatusType="반려" $checked={approvalStatus === '반려'}>
            <Text
              fontType="context"
              color={approvalStatus === '반려' ? color.red : color.gray600}
            >
              반려
            </Text>
            <input
              type="radio"
              name="approvalStatus"
              value="반려"
              onChange={handleApprovalRadioChange}
              hidden
            />
          </CardRadio>
          <CardRadio approvalStatusType="확인 중" $checked={approvalStatus === '확인 중'}>
            <Text
              fontType="context"
              color={approvalStatus === '확인 중' ? color.green : color.gray600}
            >
              확인 중
            </Text>
            <input
              type="radio"
              name="approvalStatus"
              value="확인 중"
              onChange={handleApprovalRadioChange}
              hidden
            />
          </CardRadio>
        </Row>
        <Row gap={16} style={{ alignSelf: 'flex-end' }}>
          <Button size="SMALL" styleType="SECONDARY" onClick={onClose}>
            취소
          </Button>
          <Button
            size="SMALL"
            styleType={approvalStatus ? 'PRIMARY' : 'DISABLED'}
            onClick={handleChangeFinalStatusButtonClick}
          >
            변경
          </Button>
        </Row>
      </StyledChangeFinalStatusModal>
    </BlurBackground>
  );
};

export default ChangeFinalStatusModal;

const BlurBackground = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  display: ${(props) => (props.$isOpen ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1;
`;

const StyledChangeFinalStatusModal = styled.div`
  ${flex({ flexDirection: 'column', justifyContent: 'space-between' })}
  width: 720px;
  height: 350px;
  padding: 36px;
  border-radius: 16px;
  background: ${color.white};
`;

const CardRadio = styled.label<{ approvalStatusType: string; $checked: boolean }>`
  ${flex({ alignItems: 'center', justifyContent: 'center' })}
  width: 100%;
  height: 80px;
  padding: 12px 0;
  background-color: white;
  border-radius: 12px;
  border: 1px solid ${color.gray200};

  ${({ $checked, approvalStatusType }) =>
    $checked &&
    (approvalStatusType === '승인'
      ? css`
          border: 1px solid ${color.haeMaruDefault};
          background: ${color.haeMaruLightBlue};
        `
      : approvalStatusType === '반려'
      ? css`
          border: 1px solid ${color.red};
          background: rgba(244, 67, 54, 0.1);
        `
      : approvalStatusType === '확인 중'
      ? css`
          border: 1px solid ${color.green};
          background: rgba(0, 191, 64, 0.1);
        `
      : null)}
`;
