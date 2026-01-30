'use client';

import { SignUpContent } from '@/components/signup';
import { AppLayout } from '@/layouts';
import { color } from '@maru/design-system';
import { flex } from '@maru/utils';
import styled from '@emotion/styled';
import { useMemo } from 'react';
import { Storage } from '@/apis/storage/storage';
import { TOKEN } from '@/constants/common/constants';
import { jwtDecode } from 'jwt-decode';
import useBlockedSignUp from '@/hooks/useBlockedSignUp';

const SignUp = () => {
  const token = Storage.getItem(TOKEN.ACCESS) || undefined;

  const isExpired = useMemo(() => {
    if (!token) return false;
    try {
      const decoded: { exp: number } = jwtDecode(token);
      const nowTimestamp = Date.now() / 1000;
      return decoded.exp <= nowTimestamp;
    } catch (e) {
      return true;
    }
  }, [token]);

  useBlockedSignUp({
    isBlock: isExpired,
    title: '다시 로그인해주세요.',
    content: '로그인이 만료되었습니다.\n다시 로그인해 주세요.',
  });

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
