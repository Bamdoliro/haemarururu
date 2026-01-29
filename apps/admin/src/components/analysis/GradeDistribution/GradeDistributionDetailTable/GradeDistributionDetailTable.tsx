import { Column, Row, Text } from '@maru/ui';
import { flex } from '@maru/utils';
import styled from '@emotion/styled';
import ScoreTable from './ScoreTable/ScoreTable';
import type { AnalysisRoundType, GradeDistributionType } from '@/types/analysis/client';
import DetailContent from './DetailContent/DetailContent';
import useMaxMin from './GradeDistributionDetailTable.hooks';

type DetailTableProps = {
  roundType: AnalysisRoundType;
  formList: GradeDistributionType[] | undefined;
};

const GradeDistributionDetailTable = ({ formList, roundType }: DetailTableProps) => {
  const { max, min } = useMaxMin(formList, roundType);

  return (
    <Row gap={60}>
      <ScoreInfoWrapper>
        <Column>
          <Column gap={40}>
            <Column>
              <Text fontType="btn2">최고점 점수</Text>
              <Text fontType="D2">{max} 점</Text>
            </Column>
            <Column>
              <Text fontType="btn2">최하점 점수</Text>
              <Text fontType="D2">{min} 점</Text>
            </Column>
          </Column>
        </Column>
        <Column justifyContent="space-between">
          <ScoreTable formList={formList} roundType={roundType} />
        </Column>
      </ScoreInfoWrapper>
      <DetailContent formList={formList} />
    </Row>
  );
};

export default GradeDistributionDetailTable;

const ScoreInfoWrapper = styled.div`
  ${flex({ flexDirection: 'column' })}
  height: 100%;
  gap: 64px;
`;
