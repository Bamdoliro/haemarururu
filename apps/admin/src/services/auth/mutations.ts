import { ROUTES } from '@/constants/common/constant';
import { useApiError } from '@/hooks';
import type { PostLoginAuthReq } from '@/types/auth/remote';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useAuthState, useToast } from '@maru/hooks';
import { deleteLogoutAdmin, postLoginAdmin } from './api';
import checkIsAdmin from '@/utils/functions/checkIsAdmin';

export const useLoginAdminMutation = ({ phoneNumber, password }: PostLoginAuthReq) => {
  const router = useRouter();
  const { handleError } = useApiError();
  const { toast } = useToast();
  const { setIsLoggedIn } = useAuthState();

  const rejectLogin = async (message: string) => {
    toast(message, 'ERROR');
    // 권한이 없는 계정의 인증 쿠키가 남지 않도록 서버 세션을 끊는다.
    await deleteLogoutAdmin().catch(() => {});
    router.replace(ROUTES.MAIN);
  };

  const { mutate: loginAdminMutate, ...restMutation } = useMutation({
    mutationFn: () => postLoginAdmin({ phoneNumber, password }),
    onSuccess: async () => {
      try {
        const authority = await checkIsAdmin();
        if (!authority) {
          await rejectLogin('어드민 권한이 없습니다.');
          return;
        }
        setIsLoggedIn(true);
        router.replace(ROUTES.FORM);
      } catch {
        await rejectLogin('관리자 정보 조회 실패');
      }
    },
    onError: handleError,
  });

  return { loginAdminMutate, ...restMutation };
};

export const useLogoutAdminMutation = () => {
  const router = useRouter();
  const { toast } = useToast();
  const { setIsLoggedIn } = useAuthState();

  const { mutate: logoutAdminMutate, ...restMutation } = useMutation({
    mutationFn: deleteLogoutAdmin,
    onSuccess: () => {
      toast('로그아웃 되었습니다.', 'SUCCESS');
      setIsLoggedIn(false);
      router.replace(ROUTES.MAIN);
    },
    onError: () => {
      toast('잠시후 다시 시도해주세요.', 'ERROR');
    },
  });
  return { logoutAdminMutate, ...restMutation };
};
