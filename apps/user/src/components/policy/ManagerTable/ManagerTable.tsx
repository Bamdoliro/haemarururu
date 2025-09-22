import { Column, Row, Td, Th } from '@maru/ui';

const ManagerTable = () => {
  return (
    <Column>
      <Row>
        <Th borderTopLeftRadius={12} width="33.3%" height={56}>
          구분
        </Th>
        <Th width="33.3%" height={56}>
          직위
        </Th>
        <Th borderTopRightRadius={12} width="33.3%" height={56}>
          전화번호
        </Th>
      </Row>
      <Row>
        <Td width="33.3%" height={56}>
          개인정보 보호책임자
        </Td>
        <Td width="33.3%" height={56}>
          입학담당관
        </Td>
        <Td width="33.3%" height={56}>
          070-4006-8261,070-4006-8282
        </Td>
      </Row>
      <Row>
        <Td borderBottomLeftRadius={12} width="33.3%" height={56}>
          개인정보 보호담당자
        </Td>
        <Td width="33.3%" height={56}>
          교무실
        </Td>
        <Td borderBottomRightRadius={12} width="33.3%" height={56}>
          051-742-0313
        </Td>
      </Row>
    </Column>
  );
};

export default ManagerTable;
