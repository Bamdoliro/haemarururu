'use client';

import { GlobalStyle } from '@maru/design-system';
import { useToast } from '@maru/hooks';
import { Toast } from '@maru/ui';
import { OverlayProvider } from '@toss/use-overlay';
import type { ReactNode } from 'react';
import { RecoilRoot } from 'recoil';

interface Props {
  children: ReactNode;
}

const GlobalToast = () => {
  const { showToast, toastMessage, toastType, device } = useToast();

  return showToast ? (
    <Toast type={toastType} device={device}>
      {toastMessage}
    </Toast>
  ) : null;
};

const Provider = ({ children }: Props) => {
  return (
    <RecoilRoot>
      <OverlayProvider>
        <GlobalStyle />
        {children}
      </OverlayProvider>
      <GlobalToast />
    </RecoilRoot>
  );
};

export default Provider;
