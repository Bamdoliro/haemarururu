'use client';

import { SignUpContent } from '@/components/signup';
import { AppLayout } from '@/layouts';
import { color } from '@maru/design-system';
import { flex } from '@maru/utils';
import styled from 'styled-components';
/*import { useMemo } from 'react';
import dayjs from 'dayjs';
import { Storage } from '@/apis/storage/storage';
import { TOKEN } from '@/constants/common/constants';
import { jwtDecode } from 'jwt-decode';*/
//import useBlockedSignUp from '@/hooks/useBlockedSignUp';

const SignUp = () => {
  //const token = Storage.getItem(TOKEN.ACCESS) || undefined;

/*  const { isValid, isExpired, isBeforePeriod } = useMemo(() => {
    const now = dayjs();
    const isBeforePeriod = now.isBefore(dayjs('2025-12-06T00:00:00+09:00'));

    const isTokenValid = (token?: string) => {
      if (!token) return false;

      try {
        const decoded: { exp: number } = jwtDecode(token);
        const nowTimestamp = Date.now() / 1000;
        return decoded.exp > nowTimestamp;
      } catch (e) {
        return false;
      }
    };

    return {
      isValid: isTokenValid(token),
      isExpired: token ? !isTokenValid(token) : false,
      isBeforePeriod,
    };
  }, [token]);

  const shouldBlockSignUp = useMemo(() => {
    if (isExpired) return true;
    if (isValid) return false;
    return isBeforePeriod;
  }, [isValid, isExpired, isBeforePeriod]);

  useBlockedSignUp({
    isBlock: shouldBlockSignUp,
    title: isExpired ? '다시 로그인해주세요.' : '원서 접수 기간이 아닙니다.',
    content: isExpired
      ? '로그인이 만료되었습니다.\n다시 로그인해 주세요.'
      : '아직 원서 접수 기간이 아닙니다.\n원서 접수 기간에 다시 시도해 주세요.',
  });*/

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
