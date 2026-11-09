import type { PostLoginReq } from '@/types/auth/remote';
import { useMutation } from '@tanstack/react-query';
import { deleteLogout, postLogin } from './api';
import { ROUTES } from '@/constants/common/constants';
import { useRouter } from 'next/navigation';
import { clearStaleSession } from '@/apis/instance/session';
import { useToast } from '@/hooks';
import { useAuthState } from '@maru/hooks';
import { stepAtom } from '@/stores';
import { useSetAtom } from 'jotai';

export const useLoginMutation = (
  device: string,
  { phoneNumber, password }: PostLoginReq
) => {
  const router = useRouter();
  const { toast } = useToast();
  const setStep = useSetAtom(stepAtom);
  const { setIsLoggedIn } = useAuthState();

  const { mutate: loginMutate, ...restMutation } = useMutation({
    mutationFn: () => postLogin({ phoneNumber, password }),
    onSuccess: () => {
      setIsLoggedIn(true);
      if (device === 'COMPUTER') {
        toast('로그인 되었습니다.', 'SUCCESS');
        router.replace(ROUTES.MAIN);
      } else if (device === 'MOBILE') {
        toast('로그인 되었습니다.', 'SUCCESS', 'MOBILE');
        setStep('MAIN');
      }
    },
    onError: () => {
      if (device === 'COMPUTER') {
        toast('전화번호나 비밀번호를 다시 확인해주세요.', 'ERROR');
      } else if (device === 'MOBILE') {
        toast('전화번호나 비밀번호를 다시 확인해주세요.', 'ERROR', 'MOBILE');
      }
    },
  });

  return { loginMutate, ...restMutation };
};

export const useLogoutMutation = () => {
  const { mutate: logoutMutate, ...restMutation } = useMutation({
    mutationFn: deleteLogout,
    onSettled: async (_, error) => {
      // 로그아웃 요청이 실패해도 브라우저에 남은 인증 쿠키는 정리한다.
      if (error) await clearStaleSession();
      window.location.href = ROUTES.MAIN;
    },
  });

  return { logoutMutate, ...restMutation };
};
