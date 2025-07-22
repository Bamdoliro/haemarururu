import { useGradeCaculation } from '@/hooks';
import type { GradeStep } from '@/types/form/client';
import { Row, Td, Th } from '@maru/ui';
import { styled } from 'styled-components';

interface GradePreviewProps {
  location?: GradeStep;
}

const GradePreview = ({ location }: GradePreviewProps) => {
  const {
    regularScore,
    specialScore,
    attendanceScore,
    regularTotalScore,
    specialTotalScore,
  } = useGradeCaculation();

  return (
    <StyledGradePreview>
      <Row alignItems="center">
        <Th borderTopLeftRadius={12} width="calc(100% / 2.5)" height={56}>
          전형
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
        <Td styleType="SECONDARY" width="calc(100% / 2.5)" height={56}>
          일반전형
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
        <Td width="calc(100% / 2.5)" height={56}>
          {regularTotalScore}
        </Td>
      </Row>
      <Row alignItems="center">
        <Td
          borderBottomLeftRadius={12}
          styleType="SECONDARY"
          width="calc(100% / 2.5)"
          height={56}
        >
          특별전형
        </Td>
        <Td
          width="calc(100% / 2.5)"
          height={56}
          styleType={location === '교과성적' ? 'FORM' : 'PRIMARY'}
        >
          {specialScore}
        </Td>
        <Td
          width="calc(100% / 2.5)"
          height={56}
          styleType={location === '출결상황' ? 'FORM' : 'PRIMARY'}
        >
          {attendanceScore}
        </Td>
        <Td borderBottomRightRadius={12} width="calc(100% / 2.5)" height={56}>
          {specialTotalScore}
        </Td>
      </Row>
    </StyledGradePreview>
  );
};

export default GradePreview;

const StyledGradePreview = styled.div`
  width: 100%;
`;
