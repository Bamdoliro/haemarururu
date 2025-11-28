'use client';

import EditFairForm from '@/components/fair/EditFairForm/EditFairForm';
import AppLayout from '@/layouts/AppLayout';
import { Text } from '@maru/ui';
import { flex } from '@maru/utils';
import styled from 'styled-components';

interface EditFairPageProps {
  params: { id: number };
}

const EditFairPage = ({ params: { id } }: EditFairPageProps) => {
  return (
    <AppLayout>
      <StyledEditFair>
        <StyledFairText>
          <Text fontType="H1">입학전형 설명회 수정</Text>
        </StyledFairText>
        <EditFairForm id={id} />
      </StyledEditFair>
    </AppLayout>
  );
};

export default EditFairPage;

const StyledEditFair = styled.div`
  ${flex({ flexDirection: 'column', alignItems: 'center' })}
  width: 100%;
  height: 100%;
  padding: 64px 0 60px 60px;
  position: relative;
  gap: 24px;
`;

const StyledFairText = styled.div`
  width: 100%;
  top: 0;
`;
