import Provider from '@/components/Provider';
import QueryClientProvider from '@/services/QueryClientProvider';
import type { ReactNode } from 'react';
import StyledComponentsRegistry from '@/lib/StyledComponentRegistry';

export const metadata = {
  title: '마루 어드민',
  description: '해운대고등학교 입학전형 시스템 마루의 어드민 페이지입니다.',
};

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <QueryClientProvider>
            <Provider>{children}</Provider>
          </QueryClientProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
};

export default RootLayout;
