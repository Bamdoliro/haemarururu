'use client';

import ScheduleForm from '@/components/schedule/ScheduleForm/ScheduleForm';
import AppLayout from '@/layouts/AppLayout';
import { Text } from '@maru/ui';
import { flex } from '@maru/utils';
import styled from '@emotion/styled';

const SchedulePage = () => {
  return (
    <AppLayout>
      <StyledSchedulePage>
        <Text fontType="H1">일정 관리</Text>
        <ScheduleForm />
      </StyledSchedulePage>
    </AppLayout>
  );
};

export default SchedulePage;

const StyledSchedulePage = styled.div`
  position: relative;
  ${flex({ flexDirection: 'column' })}
  gap: 40px;
  width: 100%;
  min-height: 100vh;
  padding: 64px 60px;
`;
