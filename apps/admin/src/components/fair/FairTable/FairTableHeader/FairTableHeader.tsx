import TableHeader from '@/components/common/TableHeader/TableHeader';
import { CheckBox, Row, Text } from '@maru/ui';
import { useDeleteFairAttendeeStore } from '@/store/fair/deleteFairAttendee';
import { useIsDeleteFairAttendeeEditingValueStore } from '@/store/fair/isDeleteFairParticipantEditing';

interface FairTableHeaderProps {
  attendeeId: number[];
}

const FairTableHeader = ({ attendeeId }: FairTableHeaderProps) => {
  const isDeleteFairAttendeeEditing = useIsDeleteFairAttendeeEditingValueStore();
  const [deleteFairAttendee, setDeleteFairAttendee] = useDeleteFairAttendeeStore();

  const allSelected =
    attendeeId.length > 0 && attendeeId.every((id) => deleteFairAttendee[id]);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setDeleteFairAttendee((prev) => {
      const newState = { ...prev };
      if (checked) {
        attendeeId.forEach((id) => {
          newState[id] = true;
        });
      } else {
        attendeeId.forEach((id) => {
          delete newState[id];
        });
      }
      return newState;
    });
  };

  return (
    <TableHeader>
      <Row gap={48}>
        {isDeleteFairAttendeeEditing && (
          <CheckBox checked={allSelected} onChange={handleCheckboxChange} />
        )}
        <Text fontType="p2" width={60}>
          이름
        </Text>
        <Text fontType="p2" width={60}>
          참석 인원
        </Text>
        <Text fontType="p2" width={60}>
          신청 유형
        </Text>
        <Text fontType="p2" width={293}>
          학교
        </Text>
      </Row>
      <Row gap={48}>
        <Text fontType="p2" width={120}>
          연락처
        </Text>
        <Text fontType="p2" width={120}>
          질문
        </Text>
      </Row>
    </TableHeader>
  );
};

export default FairTableHeader;
