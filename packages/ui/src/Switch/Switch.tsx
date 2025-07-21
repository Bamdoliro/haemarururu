import { color, font } from '@maru/design-system';
import { flex } from '@maru/utils';
import { css, styled } from 'styled-components';

interface SwitchProps {
  value: string;
  onChange: (value: string) => void;
  items: { name: string; value: string }[];
}

const Switch = ({ items, value, onChange }: SwitchProps) => {
  return (
    <StyledSwitch>
      {items.map((item, index) => (
        <SwitchButton
          key={`${index} Switch`}
          $active={item.value === value}
          onClick={() => onChange(item.value)}
        >
          {item.name}
        </SwitchButton>
      ))}
    </StyledSwitch>
  );
};

export default Switch;

const StyledSwitch = styled.div`
  ${flex({ alignItems: 'center' })};
  gap: 8px;
  padding: 8px;
  height: 54px;
  border-radius: 16px;
  background-color: ${color.gray100};
`;

const SwitchButton = styled.button<{ $active: boolean }>`
  ${font.context}
  padding: 8px 20px;
  height: 100%;
  border-radius: 8px;
  color: ${color.gray600};

  ${(props) =>
    props.$active &&
    css`
      background-color: ${color.haeMaruDefault};
      color: ${color.white};
    `}
`;
