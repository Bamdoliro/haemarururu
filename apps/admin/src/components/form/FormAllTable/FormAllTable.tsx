import { Column } from '@maru/ui';
import { useFormAllListQuery } from '@/services/form/queries';
import FormAllTableHeader from './FormAllTableHeader/FormAllTableHeader';
import FormAllTableItem from './FormAllTableItem/FormAllTableItem';

const FormAllTable = () => {
  const { data: formList } = useFormAllListQuery();

  return (
    <Column gap={12}>
      <FormAllTableHeader />
      {formList &&
        formList.map((item) => (
          <FormAllTableItem
            key={item.id}
            name={item.name}
            phoneNumber={item.phoneNumber}
            hasSubmittedForm={item.hasSubmittedForm}
          />
        ))}
    </Column>
  );
};

export default FormAllTable;
