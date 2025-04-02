import TableHeader from '@/components/common/TableHeader/TableHeader';
import { Row, Text } from '@maru/ui';

const RegistrationTableHeader = () => {
  return (
    <TableHeader>
      <Row gap={60}>
        <Text fontType="p2" width={50}>
          연번
        </Text>
        <Text fontType="p2" width={400}>
          이름
        </Text>
      </Row>
    </TableHeader>
  );
};

export default RegistrationTableHeader;
