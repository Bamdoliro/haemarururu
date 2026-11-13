import { color } from '@maru/design-system';
import { Column, Confirm, Text } from '@maru/ui';

interface FinalFormConfirmProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const FinalFormConfirm = ({ isOpen, onClose, onConfirm }: FinalFormConfirmProps) => {
  return (
    <Confirm
      height={350}
      isOpen={isOpen}
      title="온라인 원서 제출을 완료하시겠습니까?"
      content={
        <Column gap={12}>
          <Text color={color.gray900} fontType="p2">
            모든 제출서류를 업로드하셨다면 원서를 제출 완료 해주세요.
          </Text>
          <Text color={color.red} fontType="p2">
            원서 입력 완료 시 입학원서 접수가 완료되며 더 이상 수정이 불가합니다.
          </Text>
        </Column>
      }
      onClose={onClose}
      onConfirm={onConfirm}
      confirmButtonText="온라인 원서 제출 완료하기"
    />
  );
};

export default FinalFormConfirm;
