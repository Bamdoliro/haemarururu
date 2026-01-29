import { color, font } from '@maru/design-system';
import type { CSSProperties, TextareaHTMLAttributes } from 'react';
import React from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import ConditionalMessage from './ConditionalMessage';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  limit?: number;
  label: string | React.ReactNode;
  isError?: boolean;
  errorMessage?: string;
  message?: string;
  placeholder?: string;
  width?: CSSProperties['width'];
  excludeSpace?: boolean;
  manualLimit?: boolean;
}
const truncateByExcludedSpaces = (raw: string, limit: number) => {
  let count = 0;
  let end = 0;
  for (; end < raw.length; end++) {
    const ch = raw[end];
    if (/\s/.test(ch)) continue;
    count++;
    if (count > limit) break;
  }
  return raw.slice(0, end);
};

const Textarea = ({
  width,
  limit = 10000,
  label,
  name,
  value,
  onChange,
  isError = false,
  errorMessage,
  placeholder,
  message,
  excludeSpace = false,
  manualLimit = false,
  ...rest
}: TextareaProps) => {
  const textValue = (value ?? '') as string;

  const placeholderValue =
    placeholder ??
    `${excludeSpace ? '띄어쓰기 제외 ' : ''}${limit}자 이내로 작성해주세요.`;

  const effectiveLength = excludeSpace
    ? textValue.replace(/\s/g, '').length
    : textValue.length;

  const remainingChars = Math.max(0, limit - effectiveLength);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!onChange) return;
    if (excludeSpace && manualLimit) {
      const raw = e.target.value;
      const next = truncateByExcludedSpaces(raw, limit);
      const patched = {
        ...e,
        target: { ...e.target, value: next, name: e.target.name },
        currentTarget: { ...e.currentTarget, value: next, name: e.currentTarget.name },
      } as unknown as React.ChangeEvent<HTMLTextAreaElement>;

      onChange(patched);
      return;
    }

    onChange(e);
  };

  return (
    <div style={{ position: 'relative', width }}>
      {label && <Label>{label}</Label>}
      <div style={{ position: 'relative' }}>
        <StyledTextarea
          value={textValue}
          name={name}
          onChange={handleChange}
          placeholder={placeholderValue}
          maxLength={excludeSpace && manualLimit ? undefined : limit}
          $isError={isError}
          aria-describedby={name ? `${name}-textcount` : undefined}
          {...rest}
        />
      </div>
      <TextCount id={name ? `${name}-textcount` : undefined}>
        {remainingChars}/{limit}
      </TextCount>
      <ConditionalMessage
        isError={isError}
        errorMessage={errorMessage}
        message={message}
      />
    </div>
  );
};

export default Textarea;

const StyledTextarea = styled.textarea<{ $isError: boolean }>`
  ${font.p2}
  resize: none;
  padding: 10px 16px;
  border: 1px solid ${color.gray400};
  border-radius: 6px;
  width: 100%;
  height: 400px;
  &::placeholder {
    color: ${color.gray500};
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

const TextCount = styled.span`
  ${font.p2}
  color: ${color.gray500};
  position: absolute;
  right: 20px;
  bottom: 14px;
`;

const Label = styled.p`
  ${font.context}
  color: ${color.gray900};
  margin-bottom: 8px;
`;
