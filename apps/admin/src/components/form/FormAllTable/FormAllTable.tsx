import { Column } from '@maru/ui';
import { useFormAllListQuery } from '@/services/form/queries';
import FormAllTableHeader from './FormAllTableHeader/FormAllTableHeader';
import FormAllTableItem from './FormAllTableItem/FormAllTableItem';

const FormAllTable = () => {
  const { data: formList } = useFormAllListQuery();

  return (
    <Column gap={12}>
      <FormAllTableHeader />
      {formList && formList.map((item) => <FormAllTableItem {...item} />)}
    </Column>
  );
};

export default FormAllTable;
