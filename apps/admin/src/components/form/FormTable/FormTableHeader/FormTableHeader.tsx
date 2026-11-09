import TableHeader from '@/components/common/TableHeader/TableHeader';
import { convertToResponsive } from '@/utils';
import { CheckBox, Row, Text } from '@maru/ui';
import type { ChangeEventHandler } from 'react';
import {
  isFormToPrintSelectingAtom,
  isSecondRoundResultEditingAtom,
  formToPrintAtom,
} from '@/store';
import { useAtomValue, useSetAtom } from 'jotai';

interface FormTableHeaderProps {
  id: number[];
}

const FormTableHeader = ({ id }: FormTableHeaderProps) => {
  const isSecondRoundResultEditing = useAtomValue(isSecondRoundResultEditingAtom);
  const isFormToPrintSelecting = useAtomValue(isFormToPrintSelectingAtom);

  const setFormToPrint = useSetAtom(formToPrintAtom);

  const handleAllFormToPrintSelectChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { checked } = e.target;

    if (!id) return;

    id?.forEach((formId) => {
      setFormToPrint((prev) => ({ ...prev, [formId]: checked }));
    });
  };

  return (
    <TableHeader>
      <Row gap={48}>
        {isFormToPrintSelecting ? (
          <CheckBox onChange={handleAllFormToPrintSelectChange} />
        ) : null}
        <Text fontType="p2" width={convertToResponsive(40, 60)}>
          수험번호
        </Text>
        <Text fontType="p2" width={convertToResponsive(40, 60)}>
          이름
        </Text>
        <Text fontType="p2" width={convertToResponsive(120, 160)}>
          학교
        </Text>
        <Text fontType="p2" width={convertToResponsive(180, 240)}>
          전형
        </Text>
      </Row>
      <Row gap={48} justifyContent="flex-end">
        <Text fontType="p2" width={convertToResponsive(40, 60)}>
          전형료
        </Text>
        <Text fontType="p2" width={convertToResponsive(40, 60)}>
          제출상태
        </Text>
        <Text fontType="p2" width={convertToResponsive(40, 60)}>
          제출서류
        </Text>
        <Text fontType="p2" width={convertToResponsive(40, 60)}>
          면접 대상자
        </Text>
        <Text fontType="p2" width={convertToResponsive(40, 60)}>
          면접 번호
        </Text>
        <Text fontType="p2" width={convertToResponsive(40, 60)}>
          최종 점수
        </Text>
      </Row>
      <Text
        fontType="p2"
        width={isSecondRoundResultEditing ? 100 : convertToResponsive(40, 60)}
      >
        면접 결과
      </Text>
    </TableHeader>
  );
};

export default FormTableHeader;
