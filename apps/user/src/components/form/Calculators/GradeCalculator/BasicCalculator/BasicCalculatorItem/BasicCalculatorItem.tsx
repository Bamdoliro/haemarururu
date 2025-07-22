import { Dropdown, Td } from '@maru/ui';
import { flex } from '@maru/utils';
import styled from 'styled-components';
import { useSubjectIncompleteValueStore, useSubjectListValueStore } from '@/stores';
import { useInput } from './BasicCalculatorItem.hook';
import type { Subject } from '@/types/form/client';

interface Props {
  id: number;
  achievementLevels: string[];
  isError?: boolean[];
  isLast: boolean;
}

const ACHIEVEMENT_KEYS: (keyof Subject)[] = [
  'achievementLevel21',
  'achievementLevel22',
  'achievementLevel31',
  'achievementLevel32',
];

const BasicCalculatorItem = ({ id, achievementLevels, isError = [], isLast }: Props) => {
  const subjectList = useSubjectListValueStore();
  const subjectIncomplete = useSubjectIncompleteValueStore();
  const { handleSubjectChange } = useInput(id);

  const subject = subjectList[id];

  const getDisplayValue = (value: string | number | null, incomplete: boolean | null) => {
    if (value === null || (incomplete && value === 'C')) return '미이수';
    return value as string;
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
      {ACHIEVEMENT_KEYS.map((key) => (
        <Td key={key} width="22%" height={64}>
          <Dropdown
            value={getDisplayValue(
              subject[key],
              subjectIncomplete[subject.subjectName]?.isIncomplete21
            )}
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
