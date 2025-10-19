import { useGradeCaculation } from '@/hooks';
import type { GradeStep } from '@/types/form/client';
import { Row, Td, Th } from '@maru/ui';
import { styled } from 'styled-components';

interface GradePreviewProps {
  location?: GradeStep;
}

const GradePreview = ({ location }: GradePreviewProps) => {
  const { regularScore, attendanceScore, regularTotalScore } = useGradeCaculation();

  return (
    <StyledGradePreview>
      <Row alignItems="center">
        <Th borderTopLeftRadius={12} width="calc(100% / 2.5)" height={56}>
          1단계 점수
        </Th>
        <Th width="calc(100% / 2.5)" height={56}>
          교과성적
        </Th>
        <Th width="calc(100% / 2.5)" height={56}>
          출결상황
        </Th>
        <Th borderTopRightRadius={12} width="calc(100% / 2.5)" height={56}>
          총점
        </Th>
      </Row>
      <Row alignItems="center">
        <Td
          borderBottomLeftRadius={12}
          styleType="SECONDARY"
          width="calc(100% / 2.5)"
          height={56}
        >
          일반 / 사회통합전형
        </Td>
        <Td
          width="calc(100% / 2.5)"
          height={56}
          styleType={location === '교과성적' ? 'FORM' : 'PRIMARY'}
        >
          {regularScore}
        </Td>
        <Td
          width="calc(100% / 2.5)"
          height={56}
          styleType={location === '출결상황' ? 'FORM' : 'PRIMARY'}
        >
          {attendanceScore}
        </Td>
        <Td borderBottomRightRadius={12} width="calc(100% / 2.5)" height={56}>
          {regularTotalScore}
        </Td>
      </Row>
    </StyledGradePreview>
  );
};

export default GradePreview;

const StyledGradePreview = styled.div`
  width: 100%;
`;
