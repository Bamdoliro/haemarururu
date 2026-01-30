import { color, font } from '@maru/design-system';
import { flex } from '@maru/utils';
import styled from '@emotion/styled';
import type { InputProps } from './Input.type';

const SearchInput = ({
  width = 360,
  placeholder,
  type = 'text',
  name,
  value,
  onChange,
  icon: Icon,
  height,
  label,
}: InputProps) => {
  return (
    <div style={{ width, height }}>
      {label && <Label>{label}</Label>}
      <StyledSearchInput>
        <Input
          style={{ width }}
          onChange={onChange}
          placeholder={placeholder}
          type={type}
          name={name}
          value={value}
        />
        {Icon && <Icon color={color.gray400} width={24} height={24} />}
      </StyledSearchInput>
    </div>
  );
};

export default SearchInput;

const StyledSearchInput = styled.div`
  ${flex({ alignItems: 'center', justifyContent: 'space-between' })}
  height: 48px;
  width: 100%;
  padding: 0 12px 0 16px;
  background-color: ${color.white};
  border: 1px solid ${color.gray400};
  border-radius: 6px;
  ${font.p2}

  &:focus-within {
    border: 1px solid ${color.haeMaruDefault};
    outline: 2px solid rgba(20, 112, 255, 0.25);
  }
`;

const Input = styled.input`
  color: ${color.gray800};
  width: 100%;
  height: 100%;
  ${font.p2}

  &::placeholder {
    color: ${color.gray500};
  }
`;

const Label = styled.p`
  ${font.context}
  color: ${color.gray700};
  margin-bottom: 8px;
`;
