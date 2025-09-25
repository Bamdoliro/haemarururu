import { color, font } from '@maru/design-system';
import { IconError } from '@maru/icon';
import styled, { css } from 'styled-components';
import ConditionalMessage from './ConditionalMessage';
import type { InputProps } from './Input.type';
import { forwardRef } from 'react';

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      width = 320,
      height,
      label,
      maxLength,
      placeholder,
      type = 'text',
      name,
      value,
      onChange,
      errorMessage,
      message,
      readOnly,
      textAlign,
      isError = false,
      ...rest
    },
    ref
  ) => {
    return (
      <div style={{ width, height }}>
        {label && <Label>{label}</Label>}
        <div style={{ position: 'relative' }}>
          <StyledInput
            ref={ref}
            onChange={onChange}
            placeholder={placeholder}
            type={type}
            name={name}
            maxLength={maxLength}
            value={value}
            readOnly={readOnly}
            style={{ textAlign }}
            $isError={isError}
            {...rest}
          />
          {isError && (
            <IconError
              style={{
                position: 'absolute',
                right: 16,
                top: '50%',
                transform: 'translateY(-50%)',
              }}
              color={color.red}
              width={24}
            />
          )}
        </div>
        <ConditionalMessage
          isError={isError}
          errorMessage={errorMessage}
          message={message}
        />
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;

const StyledInput = styled.input<{ $isError: boolean }>`
  ${font.p2}
  color: ${color.gray800};
  height: 48px;
  width: 100%;
  padding: 10px 16px;
  background-color: ${color.white};
  border: 1px solid ${color.gray400};
  border-radius: 6px;

  &::placeholder {
    color: ${color.gray500};
  }
  &:focus {
    border: 1px solid ${color.haeMaruDefault};
    outline: 2px solid rgba(20, 112, 255, 0.25);
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
