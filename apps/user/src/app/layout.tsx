import Provider from '@/components/Provider';
import { AUTH_COOKIES } from '@/constants/common/constants';
import GoogleAnalytics from '@/lib/GoogleAnalytics';
import StyledComponentRegistry from '@/lib/registry';
import QueryClientProvider from '@/services/QueryClientProvider';
import { cookies } from 'next/headers';
import type { ReactNode } from 'react';

export const metadata = {
  title: '해운대고등학교 입학전형 | 마루',
  description: '해운대고등학교 입학전형 시스템 마루입니다.',
};

interface Props {
  children: ReactNode;
}

const RootLayout = ({ children }: Props) => {
  const cookieStore = cookies();
  const initialLoggedIn = AUTH_COOKIES.some((name) => cookieStore.has(name));

  return (
    <html lang="ko">
      <head>
        <body>
          {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
            <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
          ) : null}
          <StyledComponentRegistry>
            <QueryClientProvider>
              <Provider initialLoggedIn={initialLoggedIn}>{children}</Provider>
            </QueryClientProvider>
          </StyledComponentRegistry>
        </body>
      </head>
    </html>
  );
};

export default RootLayout;
