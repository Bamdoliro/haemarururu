import { Column } from '@maru/ui';
import FairTableHeader from './FairTableHeader/FairTableHeader';
import FairTableItem from './FairTableItem/FairTableItem';
import type { AttendeeData } from '@/types/fair/client';

interface FairTableProps {
  dataList: AttendeeData[];
}

const FairTable = ({ dataList }: FairTableProps) => {
  const attendeeId = dataList?.map(({ id }) => id) ?? [];

  return (
    <Column gap={12}>
      <FairTableHeader attendeeId={attendeeId} />
      {dataList?.map(
        ({ id, schoolName, name, type, phoneNumber, headcount, question }) => (
          <FairTableItem
            key={id}
            id={id}
            schoolName={schoolName}
            name={name}
            type={type}
            phoneNumber={phoneNumber}
            headcount={headcount}
            question={question}
          />
        )
      )}
    </Column>
  );
};

export default FairTable;
