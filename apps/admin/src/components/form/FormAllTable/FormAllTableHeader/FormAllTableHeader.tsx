import TableHeader from '@/components/common/TableHeader/TableHeader';
import { convertToResponsive } from '@/utils';
import { Row, Text } from '@maru/ui';

const FormAllTableHeader = () => {
  return (
    <TableHeader>
      <Row gap={48}>
        <Text fontType="p2" width={convertToResponsive(40, 60)}>
          이름
        </Text>
        <Text fontType="p2" width={convertToResponsive(120, 160)}>
          휴대폰 번호
        </Text>
      </Row>
      <Row gap={48} justifyContent="flex-end">
        <Text fontType="p2" width={convertToResponsive(40, 60)}>
          원서 상태
        </Text>
      </Row>
    </TableHeader>
  );
};

export default FormAllTableHeader;
