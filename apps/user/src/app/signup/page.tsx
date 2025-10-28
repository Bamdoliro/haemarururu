'use client';

import { SignUpContent } from '@/components/signup';
import { AppLayout } from '@/layouts';
import { color } from '@maru/design-system';
import { flex } from '@maru/utils';
import styled from 'styled-components';
import { useState, useMemo } from 'react';
import BlockedSignUpModal from '@/components/signup/BlockedSignUpModal/BlockedSignUpModal';
import { SCHEDULE } from '@/constants/common/constants';
import dayjs from 'dayjs';

const SignUp = () => {
  const isBeforeSignUpPeriod = useMemo(() => {
    const now = dayjs();
    return now.isBefore(SCHEDULE.원서_접수);
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(isBeforeSignUpPeriod);
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <BlockedSignUpModal isOpen={isModalOpen} onClose={handleCloseModal} />
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
    </>
  );
};

export default SignUp;

const StyledSignUp = styled.div`
  ${flex({ alignItems: 'center' })}
  width: 100%;
  height: 100vh;
`;
