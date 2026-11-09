import { useCallback, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useOverlay } from '@toss/use-overlay';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { Text } from '@maru/ui';
import { useAuthState } from '@maru/hooks';
import { ROUTES } from '@/constants/common/constants';
import { AlertStyleModal, NeedLoginModal } from '@/components/common';
import useSessionExpired from './useSessionExpired';

interface GuardOptions {
  period?: { start: Dayjs; end: Dayjs };
  title?: string;
  content?: string;
}

const usePageAccessGuard = (options: GuardOptions) => {
  const router = useRouter();
  const overlay = useOverlay();
  const { isLoggedIn } = useAuthState();
  const initialIsLoggedIn = useRef(isLoggedIn);

  const openNeedLoginModal = useCallback(() => {
    overlay.open(({ close, isOpen }) => (
      <NeedLoginModal
        isOpen={isOpen}
        onClose={() => {
          router.replace(ROUTES.MAIN);
          close();
        }}
        onConfirm={() => {
          router.replace(ROUTES.LOGIN);
          close();
        }}
      />
    ));
  }, [overlay, router]);

  useEffect(() => {
    const now = dayjs();

    if (!initialIsLoggedIn.current) {
      openNeedLoginModal();
    } else if (!now.isBetween(options.period?.start, options.period?.end, 'hour', '[]')) {
      overlay.open(({ close, isOpen }) => (
        <AlertStyleModal
          isOpen={isOpen}
          onClose={() => {
            router.replace(ROUTES.MAIN);
            close();
          }}
          title={options.title ?? ''}
          content={
            <Text fontType="p2" whiteSpace="pre-line">
              {options.content}
            </Text>
          }
          height={350}
        />
      ));
    }
  }, [router, overlay, options, openNeedLoginModal]);

  useSessionExpired(openNeedLoginModal);
};

export default usePageAccessGuard;
