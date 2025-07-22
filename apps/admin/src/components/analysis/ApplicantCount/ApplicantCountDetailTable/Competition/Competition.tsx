import type { ApplicantCountType } from '@/types/analysis/client';
import { Column, Row, Td, Th, Text } from '@maru/ui';
import useCompetiton from './Competition.hooks';
import { EMPTY_VALUE } from '@/constants/common/constant';

type DetailTableProps = { formList: ApplicantCountType[] | undefined };

const Competition = ({ formList }: DetailTableProps) => {
  const {
    regularCount,
    specialCount,
    theOtherCount,
    regularCompetitionRate,
    specialCompetitionRate,
    theOtherCompetitionRate,
  } = useCompetiton(formList);

  return (
    <Column gap={24}>
      <Text fontType="H5">전형별 지원자 수와 경쟁률</Text>
      <Column>
        <Row>
          <Th width={88} height={44} borderTopLeftRadius={12}>
            {EMPTY_VALUE}
          </Th>
          <Th width={80} height={44}>
            일반 전형
          </Th>
          <Th width={80} height={44}>
            특별 전형
          </Th>
          <Th width={80} height={44} borderTopRightRadius={12}>
            정원 외 전형
          </Th>
        </Row>
        <Row>
          <Td width={88} height={44}>
            지원자 수
          </Td>
          <Td width={80} height={44}>
            {regularCount}
          </Td>
          <Td width={80} height={44}>
            {specialCount}
          </Td>
          <Td width={80} height={44}>
            {theOtherCount}
          </Td>
        </Row>
        <Row>
          <Td width={88} height={44} borderBottomLeftRadius={12}>
            경쟁률
          </Td>
          <Td width={80} height={44}>
            {regularCompetitionRate}
          </Td>
          <Td width={80} height={44}>
            {specialCompetitionRate}
          </Td>
          <Td width={80} height={44} borderBottomRightRadius={12}>
            {theOtherCompetitionRate}
          </Td>
        </Row>
      </Column>
    </Column>
  );
};

export default Competition;
