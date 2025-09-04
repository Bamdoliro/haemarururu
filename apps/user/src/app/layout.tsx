import Provider from '@/components/Provider';
import GoogleAnalytics from '@/lib/GoogleAnalytics';
import StyledComponentRegistry from '@/lib/registry';
import QueryClientProvider from '@/services/QueryClientProvider';
import React from 'react';
import type { ReactNode } from 'react';

export const metadata = {
  title: '해운대고등학교 입학전형 | 마루',
  description: '해운대고등학교 입학전형 시스템 마루입니다.',
};

interface Props {
  children: ReactNode;
}

const RootLayout = ({ children }: Props) => {
  return (
    <html lang="ko">
      <head>
        <body>
          {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
            <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
          ) : null}
          <StyledComponentRegistry>
            <QueryClientProvider>
              <Provider>{children}</Provider>
            </QueryClientProvider>
          </StyledComponentRegistry>
        </body>
      </head>
    </html>
  );
};

export default RootLayout;
