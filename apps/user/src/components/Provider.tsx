'use client';

import { GlobalStyle } from '@maru/design-system';
import { useToast } from '@maru/hooks';
import { Toast } from '@maru/ui';
import { OverlayProvider } from '@toss/use-overlay';
import type { ReactNode } from 'react';
import { RecoilRoot } from 'recoil';
import { Suspense } from 'react';
import { Loader } from '@maru/ui';
import { MobileProvider } from './common';

interface Props {
  children: ReactNode;
}

const GlobalToast = () => {
  const { toasts, removeToast } = useToast();

  const computerToasts = toasts.filter((t) => t.device === 'COMPUTER');
  const mobileToasts = toasts.filter((t) => t.device === 'MOBILE');

  return (
    <>
      {computerToasts.length > 0 && (
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
          }}>
          {computerToasts.map((t) => (
            <Toast
              key={t.id}
              message={t.message}
              type={t.toastType}
              progress={t.progress}
              onRemove={() => removeToast(t.id)}
            />
          ))}
        </div>
      )}
      {mobileToasts.length > 0 && (
        <div
          style={{
            position: 'fixed',
            top: 20,
            left: 20,
            right: 20,
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
          }}>
          {mobileToasts.map((t) => (
            <Toast
              key={t.id}
              message={t.message}
              type={t.toastType}
              device="MOBILE"
              progress={t.progress}
              onRemove={() => removeToast(t.id)}
            />
          ))}
        </div>
      )}
    </>
  );
};

const Provider = ({ children }: Props) => {
  return (
    <RecoilRoot>
      <OverlayProvider>
        <GlobalStyle />
        <MobileProvider>
          <Suspense fallback={<Loader />}>{children}</Suspense>
        </MobileProvider>
      </OverlayProvider>
      <GlobalToast />
    </RecoilRoot>
  );
};

export default Provider;
