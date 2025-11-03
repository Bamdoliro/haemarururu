'use client';

import { SignUpContent } from '@/components/signup';
import { AppLayout } from '@/layouts';
import { color } from '@maru/design-system';
import { flex } from '@maru/utils';
import styled from 'styled-components';
import { useMemo, useEffect } from 'react';
import BlockedSignUpModal from '@/components/signup/BlockedSignUpModal/BlockedSignUpModal';
import dayjs from 'dayjs';
import { useOverlay } from '@toss/use-overlay';
import useTokenValidation from '@/hooks/useTokenValidation';

const SignUp = () => {
  const overlay = useOverlay();
  const { token, isValid, isExpired } = useTokenValidation();

  const shouldShowModal = useMemo(() => {
    const now = dayjs();
    const isBeforePeriod = now.isBefore(dayjs('2025-12-06T00:00:00+09:00'));
    if (isExpired) return true;
    if (isValid) return false;
    return isBeforePeriod;
  }, [isValid, isExpired]);

  useEffect(() => {
    if (shouldShowModal) {
      overlay.open(({ close }) => (
        <BlockedSignUpModal close={close} token={token} isExpired={isExpired} />
      ));
    }
  }, [shouldShowModal, token, isExpired, overlay]);

  return (
    <AppLayout backgroundColor={color.gray100}>
      <StyledSignUp>
        <img
          src="/svg/maruLogo.svg"
          style={{ margin: '0 auto' }}
          loading="lazy"
          width={480}
          height={139}
          alt="logo"
        />
        <SignUpContent />
      </StyledSignUp>
    </AppLayout>
  );
};

export default SignUp;

const StyledSignUp = styled.div`
  ${flex({ alignItems: 'center' })}
  width: 100%;
  height: 100vh;
`;
