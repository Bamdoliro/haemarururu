import { ROUTES } from '@/constants/common/constants';
import { color } from '@maru/design-system';
import { IconArrowOutward } from '@maru/icon';
import { Row, Text } from '@maru/ui';
import { flex } from '@maru/utils';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';

const ApplicationBox = () => {
  const date = '9월 6일, 11월 29일';
  const place = '본관 5층 대동관';
  const router = useRouter();

  const handleMoveFairPage = () => {
    router.push(ROUTES.FAIR);
  };

  return (
    <StyledApplicationBox onClick={handleMoveFairPage}>
      <Row gap={8} alignItems="center">
        <Text fontType="H3" color={color.gray900}>
          입학전형 설명회 신청
        </Text>
        <IconArrowOutward width={36} height={36} color={color.haeMaruDefault} />
      </Row>
      <Text fontType="p2" color={color.gray500}>
        일시: {date} <br />
        장소: {place}
      </Text>
    </StyledApplicationBox>
  );
};

export default ApplicationBox;

const StyledApplicationBox = styled.div`
  ${flex({ flexDirection: 'column', justifyContent: 'space-between' })}
  width: 384px;
  height: 180px;
  padding: 28px 32px;
  background-color: ${color.white};
  border-radius: 12px;
  border: 1px solid ${color.gray200};
  cursor: pointer;
`;
