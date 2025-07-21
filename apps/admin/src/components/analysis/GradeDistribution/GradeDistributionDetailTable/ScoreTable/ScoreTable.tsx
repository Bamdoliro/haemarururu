import type { GradeDistributionType } from '@/types/analysis/client';
import { Column, Row, Td, Text, Th } from '@maru/ui';
import useScoreStatus from './ScoreTable.hooks';
import { EMPTY_VALUE } from '@/constants/common/constant';

type ScoreTableProps = {
  formList: GradeDistributionType[] | undefined;
};

const ScoreTable = ({ formList }: ScoreTableProps) => {
  const {
    regularRoundMax,
    SpecialAdmissionRoundMax,
    regularRoundMin,
    specialAdmissionRoundMin,
    regularRoundAvg,
    SpecialAdmissionRoundAvg,
  } = useScoreStatus(formList);

  return (
    <Column gap={24}>
      <Text fontType="H5">모든 전형의 점수와 평균</Text>
      <Column>
        <Row>
          <Th width={88} height={44} borderTopLeftRadius={12}>
            {EMPTY_VALUE}
          </Th>
          <Th width={80} height={44}>
            일반 전형
          </Th>
          <Th width={80} height={44} borderTopRightRadius={12}>
            특별 전형
          </Th>
        </Row>
        <Row>
          <Td width={88} height={44}>
            최고 점수
          </Td>
          <Td width={80} height={44}>
            {regularRoundMax}
          </Td>
          <Td width={80} height={44}>
            {SpecialAdmissionRoundMax}
          </Td>
        </Row>
        <Row>
          <Td width={88} height={44}>
            최하 점수
          </Td>
          <Td width={80} height={44}>
            {regularRoundMin}
          </Td>
          <Td width={80} height={44}>
            {specialAdmissionRoundMin}
          </Td>
        </Row>
        <Row>
          <Td width={88} height={44} borderBottomLeftRadius={12}>
            평균
          </Td>
          <Td width={80} height={44}>
            {regularRoundAvg}
          </Td>
          <Td width={80} height={44} borderBottomRightRadius={12}>
            {SpecialAdmissionRoundAvg}
          </Td>
        </Row>
      </Column>
    </Column>
  );
};

export default ScoreTable;
