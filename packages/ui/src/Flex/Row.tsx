import React from 'react';
import type { FlexProps } from './Flex.type';
import styled from '@emotion/styled';

const Row = ({
  children,
  gap,
  justifyContent,
  alignItems,
  width,
  height,
  style,
}: FlexProps) => {
  return (
    <StyledRow style={{ gap, justifyContent, alignItems, width, height, ...style }}>
      {children}
    </StyledRow>
  );
};

export default Row;

const StyledRow = styled.div`
  display: flex;
`;
