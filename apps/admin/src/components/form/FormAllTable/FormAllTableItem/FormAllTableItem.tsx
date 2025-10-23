import { TableItem } from '@/components/common';
import type { FormAll } from '@/types/form/client';
import { convertToResponsive } from '@/utils';
import { color } from '@maru/design-system';
import { Row, Text } from '@maru/ui';

const FormAllTableItem = ({ name, phoneNumber, hasSubmittedForm }: FormAll) => {
  return (
    <TableItem>
      <Row gap={48}>
        <Text fontType="p2" width={convertToResponsive(40, 60)}>
          {name}
        </Text>
        <Text fontType="p2" width={convertToResponsive(120, 160)}>
          {phoneNumber}
        </Text>
      </Row>
      <Row gap={48} justifyContent="flex-end" alignItems="center">
        <Text
          fontType="p2"
          width={convertToResponsive(40, 60)}
          color={hasSubmittedForm ? color.gray600 : color.black}
        >
          {hasSubmittedForm ? '원서 제출' : '미제출'}
        </Text>
      </Row>
    </TableItem>
  );
};

export default FormAllTableItem;
