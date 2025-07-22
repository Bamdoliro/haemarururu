import { Row, Th } from '@maru/ui';

const DetailHeader = () => {
  return (
    <Row>
      <Th width="25%" height={44} borderTopLeftRadius={12}>
        전형
      </Th>
      <Th width="25%" height={44}>
        유형
      </Th>
      <Th width="25%" height={44}>
        구분
      </Th>
      <Th width="12.5%" height={44}>
        최고점
      </Th>
      <Th width="12.5%" height={44} borderTopRightRadius={12}>
        최하점
      </Th>
    </Row>
  );
};

export default DetailHeader;
