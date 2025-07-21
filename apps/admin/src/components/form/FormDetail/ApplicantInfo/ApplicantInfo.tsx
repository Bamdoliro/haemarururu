import { DataBox } from '@/components/common';
import { useFormDetailQuery } from '@/services/form/queries';
import { formatDate, formatPhoneNumber } from '@/utils';
import { Loader } from '@maru/ui';
import { flex } from '@maru/utils';
import { styled } from 'styled-components';

interface ApplicantInfoProps {
  id: number;
}

const ApplicantInfo = ({ id }: ApplicantInfoProps) => {
  const { data: formDetailData } = useFormDetailQuery(id);
  if (!formDetailData) return <Loader />;

  const applicantDetails = [
    { label: '이름', data: formDetailData.applicant.name },
    {
      label: '주민등록번호',
      data: formatDate.toShortDateTime(formDetailData.applicant.birthday),
    },
    { label: '전화번호', data: formatPhoneNumber(formDetailData.applicant.phoneNumber) },
  ];

  return (
    <StyledApplicantInfo>
      <GridContainer>
        {applicantDetails.map((item, index) => (
          <GridItem key={index}>
            <DataBox label={item.label} data={item.data} />
          </GridItem>
        ))}
      </GridContainer>
    </StyledApplicantInfo>
  );
};
export default ApplicantInfo;

const StyledApplicantInfo = styled.div`
  ${flex({ flexDirection: 'column' })}
  padding: 48px 0;
  gap: 24px;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
`;

const GridItem = styled.div``;
