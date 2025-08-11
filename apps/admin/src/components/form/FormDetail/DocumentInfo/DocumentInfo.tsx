import DataBox from '@/components/common/DataBox/DataBox';
import { useFormDetailQuery } from '@/services/form/queries';
import { Loader } from '@maru/ui';
import { flex } from '@maru/utils';
import { styled } from 'styled-components';

interface DocumentInfoProps {
  id: number;
}

const DocumentInfo = ({ id }: DocumentInfoProps) => {
  const { data: formDetailData } = useFormDetailQuery(id);
  if (!formDetailData) return <Loader />;

  const documentDetails = [
    {
      label:
        '1. 중학교 재학 중 자기주도적으로 수행한 활동 중 가장 큰 성취감을 느꼈던 학습 경험에 대하여 기술해주세요.',
      data: formDetailData.document.learningExperience,
    },
    {
      label:
        '2. 본교 건학이념과 연계해 본교에 관심을 갖게 된 동기와 고등학교 입학 후 본인의 꿈과 끼를 살리기 위한 활동계획, 그리고 고등학교 졸업 후 진로계획에 관하여 구체적으로 기술해주세요.',
      data: formDetailData.document.statementOfPurpose,
    },
    {
      label:
        '3. 본인의 인성(배려, 나눔, 협력, 타인 존중, 규칙준수 등)을 나타낼 수 있는 개인적 경험 및 이를 통해 배우고 느낀 점을 구체적으로 기술해주세요.',
      data: formDetailData.document.personality,
    },
  ];

  return (
    <StyledDocumentInfo>
      {documentDetails.map((item, index) => (
        <DataBox
          key={index}
          label={item.label}
          data={item.data}
          lengthType="LONG"
          ViewType="TOGGLE"
        />
      ))}
    </StyledDocumentInfo>
  );
};

export default DocumentInfo;

const StyledDocumentInfo = styled.div`
  ${flex({ flexDirection: 'column' })}
  padding: 48px 0;
  gap: 24px;
`;
