import { AlertStyleModal } from '@/components/common';
import { ROUTES } from '@/constants/common/constants';
import { useRouter } from 'next/navigation';
import { useOverlay } from '@toss/use-overlay';
import { useEffect } from 'react';
import { Text } from '@maru/ui';

interface BlockedOptions {
  isBlock: boolean;
  title: string;
  content: string;
}

const useBlockedSignUp = (options: BlockedOptions) => {
  const router = useRouter();
  const overlay = useOverlay();

  useEffect(() => {
    const { isBlock, title, content } = options;

    if (!isBlock) return;

    overlay.open(({ close, isOpen }) => (
      <AlertStyleModal
        isOpen={isOpen}
        onClose={() => {
          router.replace(ROUTES.MAIN);
          close();
        }}
        title={title}
        content={
          <Text fontType="p2" whiteSpace="pre-line">
            {content}
          </Text>
        }
        height={350}
      />
    ));
  }, [router, overlay, options]);
};

export default useBlockedSignUp;
