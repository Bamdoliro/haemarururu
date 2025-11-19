import { ROUTES } from '@/constants/common/constants';
import { color } from '@maru/design-system';
import { IconArrowOutward } from '@maru/icon';
import { Row, Text } from '@maru/ui';
import { flex } from '@maru/utils';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { useFairDataQuery } from '@/services/main/queries';
import formatMonthDay from '@/utils/formatMonthDay';

const ApplicationBox = () => {
  const { data: fairDataList } = useFairDataQuery();
  const router = useRouter();

  const handleMoveFairPage = () => {
    router.push(ROUTES.FAIR);
  };

  const dateList = fairDataList?.map((item) => formatMonthDay(item.start)) ?? [];
  const nearestPlace = fairDataList?.[0]?.place;

  return (
    <StyledApplicationBox onClick={handleMoveFairPage}>
      <Row gap={8} alignItems="center">
        <Text fontType="H3" color={color.gray900}>
          입학전형 설명회 신청
        </Text>
        <IconArrowOutward width={36} height={36} color={color.haeMaruDefault} />
      </Row>

      {dateList.length === 0 ? (
        <Text fontType="p2" color={color.gray500}>
          예정된 입학설명회가 없어요
        </Text>
      ) : (
        <>
          {nearestPlace && (
            <Text fontType="p2" color={color.gray500}>
              날짜: {dateList.join(', ')}
              <br />
              장소: {nearestPlace}
            </Text>
          )}
        </>
      )}
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
