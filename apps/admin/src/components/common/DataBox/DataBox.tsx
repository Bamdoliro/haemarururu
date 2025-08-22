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
  viewType?: ViewType;
}

const DataBox = ({
  label,
  data,
  lengthType = 'SHORT',
  viewType = 'NORMAL',
}: DataBoxProps) => {
  const [isOpen, setIsOpen] = useState(viewType === 'NORMAL');

  const handleToggle = () => {
    if (viewType === 'TOGGLE') {
      setIsOpen((prev) => !prev);
    }
  };

  return (
    <StyledDataBox viewType={viewType} lengthType={lengthType} onClick={handleToggle}>
      <Row width="100%" justifyContent="space-between" alignItems="center">
        <TextWrapper style={{ marginRight: viewType === 'TOGGLE' ? '50px' : '0' }}>
          <Text fontType="H4" color={color.gray900} whiteSpace="pre-wrap">
            {label}
          </Text>
        </TextWrapper>
        {viewType === 'TOGGLE' && (
          <ArrowWrapper isOpen={isOpen}>
            <IconArrowBottom width={24} height={24} color={color.gray600} />
          </ArrowWrapper>
        )}
      </Row>

      {isOpen && (
        <DataUnderlineBox lengthType={lengthType}>
          <TextWrapper>
            <Text fontType="p2" color={color.gray900} whiteSpace="pre-wrap">
              {data}
            </Text>
          </TextWrapper>
        </DataUnderlineBox>
      )}
    </StyledDataBox>
  );
};

export default DataBox;

const StyledDataBox = styled.div<{ lengthType: LengthType; viewType: ViewType }>`
  ${flex({ flexDirection: 'column', alignItems: 'flex-start' })}
  width: 100%;
  max-width: ${(props) => (props.lengthType === 'LONG' ? '800px' : '400px')};
  min-width: 0;
  padding: 24px;
  gap: 16px;

  border-radius: 12px;
  border: 1px solid ${color.gray200};
  background: ${color.white};
  cursor: ${(props) => (props.viewType === 'TOGGLE' ? 'pointer' : 'default')};
`;

const DataUnderlineBox = styled.div<{ lengthType: LengthType }>`
  ${flex({ alignItems: 'flex-start' })}
  width: 100%;
  max-width: ${(props) => (props.lengthType === 'SHORT' ? '60%' : '100%')};
  padding-bottom: 4px;
  border-bottom: 1px solid ${color.gray200};
`;

const ArrowWrapper = styled.div<{ isOpen: boolean }>`
  visibility: ${(props) => (props.isOpen ? 'hidden' : 'visible')};
  width: 24px;
  min-width: 24px;
  display: flex;
  flex-shrink: 0;
`;

const TextWrapper = styled.div`
  flex: 1;
  min-width: 0;
  word-break: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
`;
