import { color, font } from '@maru/design-system';
import React, { useRef } from 'react';
import { css, styled } from 'styled-components';
import type { InputProps } from './Input.type';
import Row from '../Flex/Row';
import Text from '../Text/Text';

const CellInput = ({
  label,
  count,
  name,
  width = 80,
  textAlign = 'center',
  onChange,
  placeholder,
  maxLength,
  value,
  isError = false,
  readOnly,
  type = 'number',
}: InputProps) => {
  const cellInputRef = useRef<HTMLInputElement>(null);

  const handleSelectAllClick = () => {
    if (cellInputRef.current) {
      cellInputRef.current.select();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;
    if (newValue === '') {
      if (onChange) {
        onChange(e);
      }
      return;
    }
    if (type === 'number') {
      if (isNaN(Number(newValue)) || Number(newValue) < 0) {
        return;
      }
      if (maxLength && newValue.length > maxLength) {
        newValue = newValue.slice(0, maxLength);
      }
      newValue = newValue.replace(/^0+/, '') || '0';
      e.target.value = newValue;
    }

    if (onChange) {
      onChange(e);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === '.' || e.key === ',') {
      e.preventDefault();
    }
  };

  return (
    <div>
      {label && <Label>{label}</Label>}
      <div style={{ position: 'relative' }}>
        <Row alignItems="center" gap={8}>
          <StyledCellInput
            ref={cellInputRef}
            name={name}
            style={{ width, textAlign }}
            onChange={handleChange}
            onClick={handleSelectAllClick}
            onKeyPress={handleKeyPress}
            type={type}
            maxLength={maxLength}
            value={value}
            placeholder={placeholder}
            $isError={isError}
            min={0}
            step="1"
            readOnly={readOnly}
          />
          {count && (
            <Text fontType="context" color={color.gray900}>
              {count}
            </Text>
          )}
        </Row>
      </div>
    </div>
  );
};

export default CellInput;

const StyledCellInput = styled.input<{ $isError: boolean }>`
  ${font.p2}
  height: 40px;
  border-radius: 6px;
  border: 1px solid ${color.gray400};
  background: ${color.white};
  color: ${color.gray900};

  &::placeholder {
    color: ${color.gray500};
  }

  &:focus {
    border: 1px solid ${color.haeMaruDefault};
    outline: 2px solid rgba(20, 112, 255, 0.25);
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  ${(props) =>
    props.$isError &&
    css`
      border: 1px solid ${color.red};
      outline: 2px solid rgba(244, 67, 54, 0.25);

      &:focus {
        border: 1px solid ${color.red};
        outline: 2px solid rgba(244, 67, 54, 0.25);
      }
    `}
`;

const Label = styled.p`
  ${font.context}
  color: ${color.gray700};
  margin-bottom: 8px;
`;
