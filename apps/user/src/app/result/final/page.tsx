'use client';

import { FinalResultBox, ResultMainBox } from '@/components/result';
import { SCHEDULE } from '@/constants/form/constants';
import { AppLayout } from '@/layouts';
import type { ResultStep } from '@/types/result/client';
import { formatFormYear, formatScheduleDate } from '@/utils';
import { color } from '@maru/design-system';
import { Column, Text } from '@maru/ui';
import { flex } from '@maru/utils';
import { SwitchCase } from '@toss/react';
import { useState } from 'react';
import { styled } from 'styled-components';

const ResultFinal = () => {
  const [finalResultStep, setFinalResultStep] = useState<ResultStep>('MAIN');

  return (
    <AppLayout header footer>
      <StyledResultFinal>
        <Column alignItems="center" gap={12}>
          <Text fontType="H6" color={color.gray900}>
            {formatFormYear(SCHEDULE.원서_접수)}학년도 해운대고등학교
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
                date={formatScheduleDate([SCHEDULE.최종_합격_발표], 'FORM')}
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
