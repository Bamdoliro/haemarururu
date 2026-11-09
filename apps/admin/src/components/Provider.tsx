'use client';

import { GlobalStyle } from '@maru/design-system';
import { AuthStateProvider, useToast } from '@maru/hooks';
import { Toast } from '@maru/ui';
import { OverlayProvider } from '@toss/use-overlay';
import type { ReactNode } from 'react';
import { RecoilRoot } from 'recoil';

interface Props {
  children: ReactNode;
  initialLoggedIn: boolean;
}

const GlobalToast = () => {
  const { toasts, removeToast } = useToast();

  return toasts.length > 0 ? (
    <div
      style={{
        position: 'fixed',
        top: 150,
        right: 48,
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        minWidth: 280,
      }}
    >
      {toasts.map((t) => (
        <Toast
          key={t.id}
          message={t.message}
          type={t.toastType}
          progress={t.progress}
          onRemove={() => removeToast(t.id)}
        />
      ))}
    </div>
  ) : null;
};

const Provider = ({ children, initialLoggedIn }: Props) => {
  return (
    <RecoilRoot>
      <AuthStateProvider initialLoggedIn={initialLoggedIn}>
        <OverlayProvider>
          <GlobalStyle />
          {children}
        </OverlayProvider>
        <GlobalToast />
      </AuthStateProvider>
    </RecoilRoot>
  );
};

export default Provider;
