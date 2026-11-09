'use client';

import type { ReactNode } from 'react';
import { createContext, useContext, useMemo, useState } from 'react';

interface AuthStateContextValue {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
}

const AuthStateContext = createContext<AuthStateContextValue | null>(null);

interface AuthStateProviderProps {
  children: ReactNode;
  initialLoggedIn?: boolean;
}

export const AuthStateProvider = ({
  children,
  initialLoggedIn = false,
}: AuthStateProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(initialLoggedIn);

  const value = useMemo(
    () => ({
      isLoggedIn,
      setIsLoggedIn,
    }),
    [isLoggedIn, setIsLoggedIn],
  );

  return <AuthStateContext.Provider value={value}>{children}</AuthStateContext.Provider>;
};

const useAuthState = () => {
  const value = useContext(AuthStateContext);

  if (!value) {
    throw new Error('useAuthState must be used within AuthStateProvider');
  }

  return value;
};

export default useAuthState;
