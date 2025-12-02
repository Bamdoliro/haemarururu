import { CompleteAlarm } from '@/components/form';
import { AppLayout } from '@/layouts';
import { color } from '@maru/design-system';
import { IconCheckCircle } from '@maru/icon';
import { Button, Column, Row, Text } from '@maru/ui';
import { flex } from '@maru/utils';
import { styled } from 'styled-components';
import { useCTAButton } from './FinalSubmissionCompleted.hook';
import { SCHEDULE } from '@/constants/common/constants';
import formatMonthDay from '@/utils/formatMonthDay';
import { formatScheduleDate } from '@/utils';

const FinalSubmissionCompleted = () => {
  const { handleDownloadReciptButtonClick, userData } = useCTAButton();

  return (
    <AppLayout header footer>
      <CompleteAlarmBox>
        <CompleteAlarm
          text="원서 입력 완료"
          icon={<IconCheckCircle width={150} height={150} />}
        />
      </CompleteAlarmBox>
      <StyledFinalSubmissionCompleted>
        <Row gap={8} alignItems="center" justifyContent="center">
          <IconCheckCircle width={64} height={64} />
          <Text fontType="H1" color={color.gray900}>
            입학원서 입력 완료
          </Text>
        </Row>
        <Column gap={71} alignItems="center">
          <Column gap={27} alignItems="center">
            <Text fontType="H2" color={color.gray900}>
              해운대고등학교에 지원해주셔서 감사합니다.
            </Text>
            <Text fontType="p2" color={color.gray900} textAlign="center">
              {userData.name}님, 해운대고등학교에 지원해주셔서 대단히 감사드립니다.
              <br />
              {formatScheduleDate(
                [SCHEDULE.방문_원서_접수, SCHEDULE.원서_접수_마감],
                'RESULT'
              )}
              까지 본교에 방문하여 원서를 제출하실 수 있습니다.
              <br />
              면접대상자는 {formatMonthDay(SCHEDULE.일차_합격_발표, 'DAY_OF_WEEK')}에
              발표될 예정입니다.
            </Text>
          </Column>
          <Button
            onClick={handleDownloadReciptButtonClick}
            size="SMALL"
            styleType="PRIMARY"
          >
            접수증 다운로드
          </Button>
        </Column>
      </StyledFinalSubmissionCompleted>
    </AppLayout>
  );
};

export default FinalSubmissionCompleted;

const StyledFinalSubmissionCompleted = styled.div`
  ${flex({ flexDirection: 'column' })}
  width: 100%;
  height: 100%;
  gap: 70px;
  padding-top: 69px;

  opacity: 0;
  animation: show 1.2s 2s cubic-bezier(0.22, 0.61, 0.36, 1) forwards;

  pointer-events: none;

  @keyframes show {
    from {
      transform: translateY(200px);
    }
    to {
      transform: translateY(0);
      opacity: 100;
      pointer-events: auto;
    }
  }
`;

const CompleteAlarmBox = styled.div`
  width: 100%;
  position: absolute;

  animation: hide 1.2s 1s cubic-bezier(0.65, 0.05, 0.36, 1) forwards;

  @keyframes hide {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(-300px);
      opacity: 0;
      display: none;
    }
  }
`;
