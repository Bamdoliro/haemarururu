import { Column, Row, Td, Th } from '@maru/ui';
import { PHONE_NUMBER } from '@/constants/common/constants';

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
          {PHONE_NUMBER.입학담당관_일}, {PHONE_NUMBER.입학담당관_이}
        </Td>
      </Row>
      <Row>
        <Td borderBottomLeftRadius={12} width="33.3%" height={56}>
          개인정보 보호담당자
        </Td>
        <Td width="33.3%" height={56}>
          행정실
        </Td>
        <Td borderBottomRightRadius={12} width="33.3%" height={56}>
          {PHONE_NUMBER.행정실_전화번호}
        </Td>
      </Row>
    </Column>
  );
};

export default ManagerTable;
