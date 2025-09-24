import { Dropdown, Td } from '@maru/ui';
import { flex } from '@maru/utils';
import styled from 'styled-components';
import { useSubjectListValueStore } from '@/stores';
import { useInput } from './BasicCalculatorItem.hook';

interface Props {
  id: number;
  achievementLevels: string[];
  isError?: boolean[];
  isLast: boolean;
}

const ACHIEVEMENT_KEYS = [
  'achievementLevel21',
  'achievementLevel22',
  'achievementLevel31',
  'achievementLevel32',
] as const;

const BasicCalculatorItem = ({ id, achievementLevels, isError = [], isLast }: Props) => {
  const subjectList = useSubjectListValueStore();
  const { handleSubjectChange } = useInput(id);
  const subject = subjectList[id];
  const getDisplayValue = (value: string) => {
    if (value === 'F') return '미이수';
    return value;
  };
  return (
    <StyledBasicCalculatorItem>
      <Td
        styleType="SECONDARY"
        width="15.5%"
        height={64}
        borderBottomLeftRadius={isLast ? '12px' : '0px'}
      >
        {subject.subjectName}
      </Td>
      {ACHIEVEMENT_KEYS.map((key, colIndex) => (
        <Td
          key={key}
          width="22%"
          height={64}
          borderBottomRightRadius={
            isLast && colIndex === ACHIEVEMENT_KEYS.length - 1 ? '12px' : '0px'
          }
        >
          <Dropdown
            value={getDisplayValue(subject[key])}
            size="SMALL"
            data={achievementLevels}
            width={80}
            onChange={handleSubjectChange}
            name={key}
            isError={subject[key] === '-' && isError[id]}
          />
        </Td>
      ))}
    </StyledBasicCalculatorItem>
  );
};

export default BasicCalculatorItem;

const StyledBasicCalculatorItem = styled.div`
  ${flex({ alignItems: 'center' })}
  width: 100%;
  height: 100%;
`;
