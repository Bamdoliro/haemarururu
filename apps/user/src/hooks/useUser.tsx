import { useUserQuery } from '@/services/user/queries';
import { useUserStore } from '@/stores';
import { useEffect, useMemo } from 'react'; // ✅ useMemo 추가

// ✅ 반환 전용 타입: 기존 store User에 registrationNumber만 덧붙임
type UserWithReg = {
  name: string;
  phoneNumber: string;
  authority?: string;
  registrationNumber: string;
};

const useUser = () => {
  const [user, setUser] = useUserStore();
  const { data: userData } = useUserQuery();

  useEffect(() => {
    if (userData) setUser(userData);
  }, [setUser, userData]);

  // ✅ 반환할 때만 registrationNumber 필드 추가
  const mergedUser = useMemo<UserWithReg>(
    () => ({
      name: (user as any)?.name ?? '',
      phoneNumber: (user as any)?.phoneNumber ?? '',
      authority: (user as any)?.authority,
      registrationNumber: (user as any)?.registrationNumber ?? '', // ← 핵심!
    }),
    [user]
  );

  // ✅ 이제 userData에 registrationNumber 포함됨
  return { userData: mergedUser, isLogIn: !!userData };
};

export default useUser;
