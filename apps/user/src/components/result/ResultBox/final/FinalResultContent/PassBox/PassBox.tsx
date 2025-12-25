import { ROUTES } from '@/constants/common/constants';
import { color } from '@maru/design-system';
import { Button, Text } from '@maru/ui';
import { flex } from '@maru/utils';
import { useRouter } from 'next/navigation';
import { styled } from 'styled-components';

const PassBox = () => {
  const router = useRouter();

  const handleMoveMainPage = () => {
    router.push(ROUTES.MAIN);
  };

  return (
    <StyledPassBox>
      <Text fontType="p1" color={color.gray900} textAlign="center">
        당신의 합격을 진심으로 축하드립니다!
        <br />
        당신의 밝은 미래를 응원하며,
        <br />
        앞으로의 여정에 당신과 함께할 수 있어 영광입니다.
        <br />
        <br />
        합격자께서는 2025년 12월 29일(월) 오전 10시, 본관 5층 대동관으로 와 주시길
        바랍니다.
      </Text>
      <Button size="LARGE" styleType="PRIMARY" onClick={handleMoveMainPage}>
        홈으로 돌아가기
      </Button>
    </StyledPassBox>
  );
};

export default PassBox;

const StyledPassBox = styled.div`
  ${flex({ flexDirection: 'column', alignItems: 'center' })}
  width: 100%;
  height: 100%;
  padding-bottom: 127px;
  gap: 161px;
`;
