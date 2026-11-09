'use client';

import { FinalResultBox, ResultMainBox } from '@/components/result';
import usePageAccessGuard from '@/hooks/usePageAccessGuard';
import { AppLayout } from '@/layouts';
import type { ResultStep } from '@/types/result/client';
import { formatFormYear, formatScheduleDate } from '@/utils';
import { color } from '@maru/design-system';
import { Column, Text } from '@maru/ui';
import { flex } from '@maru/utils';
import { SwitchCase } from '@toss/react';
import { useState } from 'react';
import styled from '@emotion/styled';
import { useSchedule } from '@/services/schedule/queries';

const ResultFinal = () => {
  const schedule = useSchedule();
  usePageAccessGuard({
    period: { start: schedule.최종_합격_발표, end: schedule.입학_등록 },
    title: '최종 합격 발표 기간이 아닙니다',
    content:
      '최종 합격 발표 기간에만 확인이 가능합니다.\n최종 합격 발표 기간까지 조금만 기다려 주세요.',
  });

  const [finalResultStep, setFinalResultStep] = useState<ResultStep>('MAIN');

  return (
    <AppLayout header footer>
      <StyledResultFinal>
        <Column alignItems="center" gap={12}>
          <Text fontType="H6" color={color.gray900}>
            {formatFormYear(schedule.원서_접수)}학년도 해운대고등학교
          </Text>
          <Text fontType="D3" color={color.gray900}>
            최종 합격자 발표
          </Text>
        </Column>
        <SwitchCase
          value={finalResultStep}
          caseBy={{
            MAIN: (
              <ResultMainBox
                date={formatScheduleDate([schedule.최종_합격_발표], 'FORM')}
                capacity="일반전형 144명, 사회 다양성 전형 36명, 정원 외 전형 8명"
                setResultStep={setFinalResultStep}
              />
            ),
            RESULT: <FinalResultBox />,
          }}
        />
      </StyledResultFinal>
    </AppLayout>
  );
};

export default ResultFinal;

const StyledResultFinal = styled.div`
  ${flex({ alignItems: 'center', flexDirection: 'column' })}
  width: 100%;
  height: 100%;
  padding-top: 82px;
  gap: 48px;
`;
