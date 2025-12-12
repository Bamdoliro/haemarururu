import { color, font } from '@maru/design-system';
import { Button, Column, Row, Text } from '@maru/ui';
import { flex } from '@maru/utils';
import { styled } from 'styled-components';
import { useCTAButton } from '../FirstResultContent.hook';

interface PassBoxProps {
  interviewNumber: string | null | undefined;
}

const PassBox = ({ interviewNumber }: PassBoxProps) => {
  const { handleMoveMainPage, handleDownloadAdmissionsGuideline } = useCTAButton();

  return (
    <StyledPassBox>
      <Column gap={24} alignItems="center">
        <Text fontType="p1" color={color.gray900} textAlign="center">
          {interviewNumber}
          <br />
          (오전 소집자는 대기실 08:00 / 오후 소집자는 체육관 12:20)
          <br />
          여러분을 응원합니다.
        </Text>
        <AdmissionsGuidelineDownloadLink onClick={handleDownloadAdmissionsGuideline}>
          입학 요강 다운로드
        </AdmissionsGuidelineDownloadLink>
      </Column>
      <Row gap={16} alignItems="center">
        <Button size="LARGE" styleType="SECONDARY" onClick={handleMoveMainPage}>
          홈으로 돌아가기
        </Button>
      </Row>
    </StyledPassBox>
  );
};

export default PassBox;

const StyledPassBox = styled.div`
  ${flex({ flexDirection: 'column', alignItems: 'center' })}
  width: 100%;
  height: 100%;
  padding-bottom: 127px;
  gap: 161px;
`;

const AdmissionsGuidelineDownloadLink = styled.a`
  ${font.p2}
  color: ${color.gray600};

  &:hover {
    text-decoration-line: underline;
    text-decoration-color: ${color.gray600};
  }
`;
