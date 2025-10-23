import { DataBox } from '@/components/common';
import { GRADUATION_TYPE_VALUE } from '@/constants/form/constant';
import { useFormDetailQuery } from '@/services/form/queries';
import { formatPhoneNumber } from '@/utils';
import { Loader } from '@maru/ui';
import { flex } from '@maru/utils';
import { styled } from 'styled-components';

interface EducationInfoProps {
  id: number;
}

const EducationInfo = ({ id }: EducationInfoProps) => {
  const { data: formDetailData } = useFormDetailQuery(id);
  if (!formDetailData) return <Loader />;
  const educationDetails =
    formDetailData.education.graduationType === 'QUALIFICATION_EXAMINATION'
      ? [{ label: '합격 일자', data: formDetailData.education.graduationDate }]
      : [
          {
            label: '졸업 구분',
            data: GRADUATION_TYPE_VALUE[formDetailData.education.graduationType],
          },
          { label: '출신 학교명', data: formDetailData.education.schoolName },
          { label: '졸업(예정) 일자', data: formDetailData.education.graduationDate },
          { label: '학교 지역', data: formDetailData.education.schoolLocation },
          { label: '표준학교코드', data: formDetailData.education.schoolCode },
          {
            label: '학교 연락처',
            data: formatPhoneNumber(formDetailData.education.schoolPhoneNumber),
          },
          { label: '작성교사 이름', data: formDetailData.education.teacherName },
          {
            label: '작성교사 연락처',
            data: formDetailData.education.teacherMobilePhoneNumber,
          },
        ];

  return (
    <StyledEducationInfo>
      <GridContainer>
        {educationDetails.map((item, index) => (
          <GridItem key={index}>
            <DataBox label={item.label} data={item.data} />
          </GridItem>
        ))}
      </GridContainer>
    </StyledEducationInfo>
  );
};
export default EducationInfo;

const StyledEducationInfo = styled.div`
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
