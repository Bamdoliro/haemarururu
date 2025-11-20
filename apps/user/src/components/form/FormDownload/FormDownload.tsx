import { color, font } from '@maru/design-system';
import { Column, Text } from '@maru/ui';
import styled from 'styled-components';

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
        (공통,해당자)제출서류들은 스캔해서 하나의 PDF파일로 첨부해주시기 바랍니다.
        <br />
        제출 서류를 업로드해야 원서 입력완료가 가능합니다.
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
