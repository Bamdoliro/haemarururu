import { Column } from '@maru/ui';
import FormTableHeader from './FormTableHeader/FormTableHeader';
import FormTableItem from './FormTableItem/FormTableItem';
import { useFormListQuery } from '@/services/form/queries';

const FormTable = () => {
  const { data: formList } = useFormListQuery();
  const formIdList = formList?.map((form) => form.id);

  return (
    <Column gap={12}>
      <FormTableHeader id={formIdList ?? []} />
      {formList && formList.map((item) => <FormTableItem {...item} />)}
    </Column>
  );
};

export default FormTable;
