import { color, font } from '@maru/design-system';
import { Column, Text } from '@maru/ui';
import styled from '@emotion/styled';

interface FormDownloadProps {
  onClick: () => void;
}

const FormDownload = ({ onClick }: FormDownloadProps) => {
  return (
    <Column gap={36} alignItems="flex-start">
      <Text fontType="H1" color={color.gray900}>
        원서 제출
      </Text>
      <Text fontType="p2" color={color.gray900}>
        제출 서류를 업로드해야 원서 입력 완료가 가능합니다.
      </Text>
      <ExportFormButton onClick={onClick}>[ 작성한 원서(pdf) 다운로드 ]</ExportFormButton>
    </Column>
  );
};

export default FormDownload;

const ExportFormButton = styled.button`
  ${font.p2};
  color: ${color.gray600};
`;
