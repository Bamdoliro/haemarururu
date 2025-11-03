import { useMemo } from 'react';
import { Storage } from '@/apis/storage/storage';
import { TOKEN } from '@/constants/common/constants';

const useTokenValidation = () => {
  const isTokenValid = (token: string | null): boolean => {
    if (!token) return false;
    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp;
    if (!exp) return false;
    const currentTime = Math.floor(Date.now() / 1000);
    return exp > currentTime;
  };

  return useMemo(() => {
    const token = Storage.getItem(TOKEN.ACCESS);
    const refreshToken = Storage.getItem(TOKEN.REFRESH);
    const isValid = isTokenValid(token);

    if (token && !isValid && !refreshToken) {
      localStorage.clear();
    }

    return {
      token: isValid ? token : null,
      isValid,
      isExpired: !!(token && !isValid),
    };
  }, []);
};

export default useTokenValidation;
