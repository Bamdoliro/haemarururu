import { TableItem } from '@/components/common';
import { formatPhoneNumber } from '@/utils';
import { Row, Text, TextButton, CheckBox } from '@maru/ui';
import FairQuestionModal from '../FairQuestionModal/FairQuestionModal';
import { useOverlay } from '@toss/use-overlay';
import { useIsDeleteFairAttendeeEditingValueStore } from '@/store/fair/isDeleteFairParticipantEditing';
import { useDeleteFairAttendeeStore } from '@/store/fair/deleteFairAttendee';

interface FairTableItemProps {
  schoolName: string;
  id: number;
  name: string;
  type: string;
  phoneNumber: string;
  headcount: number;
  question: string;
}

const FairTableItem = ({
  schoolName,
  name,
  id,
  type,
  phoneNumber,
  headcount,
  question,
}: FairTableItemProps) => {
  const overlay = useOverlay();
  const isDeleteFairAttendeeEditing = useIsDeleteFairAttendeeEditingValueStore();
  const [deleteFairAttendee, setDeleteFairAttendee] = useDeleteFairAttendeeStore();

  const handleFairQuestionModalButtonClick = () => {
    overlay.open(({ isOpen, close }) => (
      <FairQuestionModal
        name={name}
        question={question}
        isOpen={isOpen}
        onClose={close}
      />
    ));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setDeleteFairAttendee((prev) => {
      const newState = { ...prev };
      if (checked) {
        newState[id] = true;
      } else {
        delete newState[id];
      }
      return newState;
    });
  };

  return (
    <TableItem>
      <Row gap={48}>
        {isDeleteFairAttendeeEditing && (
          <CheckBox checked={!!deleteFairAttendee[id]} onChange={handleCheckboxChange} />
        )}
        <Text fontType="p2" width={60}>
          {name}
        </Text>
        <Text fontType="p2" width={60}>
          {headcount}
        </Text>
        <Text fontType="p2" width={60}>
          {type}
        </Text>
        <Text fontType="p2" width={293}>
          {schoolName}
        </Text>
      </Row>
      <Row gap={48}>
        <Text fontType="p2" width={120}>
          {formatPhoneNumber(phoneNumber)}
        </Text>
        <TextButton
          fontType="p2"
          width={120}
          ellipsis={true}
          onClick={question ? handleFairQuestionModalButtonClick : undefined}
        >
          {question}
        </TextButton>
      </Row>
    </TableItem>
  );
};

export default FairTableItem;
