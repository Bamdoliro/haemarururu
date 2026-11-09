'use client';

import { GlobalStyle, color } from '@maru/design-system';
import { AuthStateProvider, useAuthState, useToast } from '@maru/hooks';
import { useQueryClient } from '@tanstack/react-query';
import { useSessionExpired } from '@/hooks';
import { Text, Toast } from '@maru/ui';
import { flex } from '@maru/utils';
import { OverlayProvider } from '@toss/use-overlay';
import type { ReactNode } from 'react';
import { Provider as JotaiProvider } from 'jotai';
import { Suspense } from 'react';
import { Loader } from '@maru/ui';
import styled from '@emotion/styled';
import { MobileProvider } from './common';
import { useScheduleQuery } from '@/services/schedule/queries';
import { USER_SCOPED_KEYS } from '@/constants/common/constants';

interface Props {
  children: ReactNode;
}

interface ProviderProps extends Props {
  initialLoggedIn: boolean;
}

const SessionExpiredHandler = () => {
  const { setIsLoggedIn } = useAuthState();
  const queryClient = useQueryClient();

  useSessionExpired(() => {
    setIsLoggedIn(false);
    USER_SCOPED_KEYS.forEach((key) => queryClient.removeQueries({ queryKey: [key] }));
  });

  return null;
};

const ScheduleGate = ({ children }: Props) => {
  const { data, isError } = useScheduleQuery();

  if (isError) {
    return (
      <StyledScheduleError>
        <Text fontType="p1" color={color.gray900} textAlign="center">
          입학 일정을 불러오지 못했습니다.
          <br />
          잠시 후 다시 시도해 주세요.
        </Text>
      </StyledScheduleError>
    );
  }

  if (!data) return <Loader />;

  return <>{children}</>;
};

const StyledScheduleError = styled.div`
  ${flex({ alignItems: 'center', justifyContent: 'center' })}
  width: 100%;
  height: 100vh;
`;

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
          }}
        >
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
          }}
        >
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

const Provider = ({ children, initialLoggedIn }: ProviderProps) => {
  return (
    <JotaiProvider>
      <AuthStateProvider initialLoggedIn={initialLoggedIn}>
        <SessionExpiredHandler />
        <OverlayProvider>
          <GlobalStyle />
          <ScheduleGate>
            <MobileProvider>
              <Suspense fallback={<Loader />}>{children}</Suspense>
            </MobileProvider>
          </ScheduleGate>
        </OverlayProvider>
        <GlobalToast />
      </AuthStateProvider>
    </JotaiProvider>
  );
};

export default Provider;
