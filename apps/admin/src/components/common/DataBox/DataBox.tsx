import { useState } from 'react';
import { color } from '@maru/design-system';
import { IconArrowBottom } from '@maru/icon';
import { Row, Text } from '@maru/ui';
import { flex } from '@maru/utils';
import styled from 'styled-components';

type LengthType = 'SHORT' | 'LONG';
type ViewType = 'NORMAL' | 'TOGGLE';

interface DataBoxProps {
  label: string;
  data: string | number;
  lengthType?: LengthType;
  ViewType?: ViewType;
}

const DataBox = ({
  label,
  data,
  lengthType = 'SHORT',
  ViewType = 'NORMAL',
}: DataBoxProps) => {
  const [isOpen, setIsOpen] = useState(ViewType === 'NORMAL');

  const handleToggle = () => {
    if (ViewType === 'TOGGLE') {
      setIsOpen((prev) => !prev);
    }
  };

  return (
    <StyledDataBox lengthType={lengthType}>
      <Row width="100%" justifyContent="space-between" alignItems="center">
        <Text fontType="H4" color={color.gray900}>
          {label}
        </Text>
        {ViewType === 'TOGGLE' && (
          <ArrowWrapper isOpen={isOpen} onClick={handleToggle}>
            <IconArrowBottom width={24} height={24} color={color.gray600} />
          </ArrowWrapper>
        )}
      </Row>

      {isOpen && (
        <DataUnderlineBox lengthType={lengthType}>
          <Text fontType="p2" color={color.gray900}>
            {data}
          </Text>
        </DataUnderlineBox>
      )}
    </StyledDataBox>
  );
};
export default DataBox;

const StyledDataBox = styled.div<{ lengthType: LengthType }>`
  ${flex({ flexDirection: 'column', alignItems: 'flex-start' })}
  width: ${(props) => (props.lengthType === 'SHORT' ? '100%' : 'fit-content')};
  min-width: 400px;
  padding: 24px;
  gap: 16px;

  border-radius: 12px;
  border: 1px solid ${color.gray200};
  background: ${color.white};
`;

const DataUnderlineBox = styled.div<{ lengthType: LengthType }>`
  ${flex({ alignItems: 'flex-start' })}
  width: ${(props) => (props.lengthType === 'SHORT' ? '60%' : '100%')};
  padding-bottom: 4px;
  border-bottom: 1px solid ${color.gray200};
`;

const ArrowWrapper = styled.div<{ isOpen: boolean }>`
  display: flex;
  transform: rotate(${(props) => (props.isOpen ? '180deg' : '0deg')});
  transition: transform 0.2s ease-in-out;
  cursor: pointer;
`;
