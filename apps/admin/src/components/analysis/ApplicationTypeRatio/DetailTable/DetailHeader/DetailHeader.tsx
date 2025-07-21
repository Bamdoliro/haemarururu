import { Row, Th } from '@maru/ui';

const DetailHeader = () => {
  return (
    <Row>
      <Th width="30%" height={44} borderTopLeftRadius={12}>
        전형
      </Th>
      <Th width="30%" height={44}>
        유형
      </Th>
      <Th width="30%" height={44}>
        구분
      </Th>
      <Th width="10%" height={44} borderTopRightRadius={12}>
        비율
      </Th>
    </Row>
  );
};

export default DetailHeader;
