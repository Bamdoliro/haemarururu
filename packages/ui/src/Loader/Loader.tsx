import { color } from '@maru/design-system';
import type { CSSProperties } from 'react';
import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import styled from 'styled-components';

interface LoaderProps {
  top?: CSSProperties['top'];
  left?: CSSProperties['left'];
}

const Loader = ({ top = '50%', left = '50%' }: LoaderProps) => {
  return (
    <SpinnerBox top={top} left={left}>
      <ClipLoader color={color.haeMaruDefault} />
    </SpinnerBox>
  );
};

export default Loader;

const SpinnerBox = styled.div<{ top: CSSProperties['top']; left: CSSProperties['left'] }>`
  position: absolute;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  transform: translate(-50%, -50%);
`;
