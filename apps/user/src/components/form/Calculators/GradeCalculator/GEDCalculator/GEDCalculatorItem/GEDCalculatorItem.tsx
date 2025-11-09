import { CellInput, Td, Text } from '@maru/ui';
import { flex } from '@maru/utils';
import { styled } from 'styled-components';
import { useInput } from './GEDCalculatorItem.hook';
import { color } from '@maru/design-system';

interface Props {
  id: number;
  subject: string;
  score: number | null;
  isLast: boolean;
}

const GEDCalculatorItem = ({ id, subject, score, isLast }: Props) => {
  const { handleGEDSubjectChange } = useInput(id);

  return (
    <StyledGEDCalculatorItem>
      <Td
        styleType="SECONDARY"
        width="15.1%"
        height={64}
        borderBottomLeftRadius={isLast ? '12px' : '0px'}
      >
        {subject}
      </Td>
      <Td width="69.8%" height={64}>
        <CellInput
          value={score ?? ''}
          name="score"
          onChange={handleGEDSubjectChange}
          placeholder="0"
        />
      </Td>
      <Td width="15.1%" height={64} borderBottomRightRadius={isLast ? '12px' : '0px'}>
        <Text fontType="context" color={color.gray900}>
          {score === null
            ? '-'
            : score >= 99 && score <= 100
            ? 'A'
            : score >= 97 && score < 99
            ? 'B'
            : score >= 93 && score < 97
            ? 'C'
            : score >= 89 && score < 93
            ? 'D'
            : 'E'}
        </Text>
      </Td>
    </StyledGEDCalculatorItem>
  );
};

export default GEDCalculatorItem;

const StyledGEDCalculatorItem = styled.div`
  ${flex({ alignItems: 'center' })}
  width: 100%;
  height: 100%;
`;
