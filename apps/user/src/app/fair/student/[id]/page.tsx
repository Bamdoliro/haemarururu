'use client';

import { FairStudentApplicationBox } from '@/components/fair';
import { AppLayout } from '@/layouts';
import { useFairListQuery } from '@/services/fair/queries';
import { formatApplicationDate, formatStartDate } from '@/utils';
import { color } from '@maru/design-system';
import { Column, Text } from '@maru/ui';
import { flex } from '@maru/utils';
import styled from 'styled-components';

interface FairStudentApplicationProps {
  params: { id: number };
}

const FairStudentApplication = ({ params: { id } }: FairStudentApplicationProps) => {
  const { data: fairListData } = useFairListQuery('STUDENT_AND_PARENT');

  const numericId = Number(id);
  const selectedFair = fairListData?.find((fair) => fair.id === numericId);

  const { start, place, applicationStartDate, applicationEndDate } = selectedFair || {};

  return (
    <AppLayout header footer>
      <StyledFairStudentApplication>
        <Column gap={36}>
          <Text fontType="H1" color={color.gray900}>
            2024학년도 부산소프트웨어마이스터고등학교
            <br />
            입학전형 설명회 참가 신청 (학생, 학부모)
          </Text>
          <Column gap={24}>
            <Text fontType="p1" color={color.gray600}>
              일시 : {formatStartDate(start ?? '')}
              <br />
              장소 : {place}
            </Text>
            <Text fontType="p1" color={color.red}>
              신청 기한: {formatApplicationDate(applicationStartDate ?? '')} ~{' '}
              {formatApplicationDate(applicationEndDate ?? '')}
            </Text>
            <Text fontType="p1" color={color.gray600}>
              <Text fontType="p1" color={color.red}>
                *
              </Text>
              는 필수항목입니다.
            </Text>
          </Column>
        </Column>
        <FairStudentApplicationBox id={id} />
      </StyledFairStudentApplication>
    </AppLayout>
  );
};

export default FairStudentApplication;

const StyledFairStudentApplication = styled.div`
  ${flex({ flexDirection: 'column', alignItems: 'flex-start' })}
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 82px 312px 240px;
  gap: 48px;
`;
