import type { GradeDistributionType } from '@/types/analysis/client';
import { font } from '@maru/design-system';
import { Column, Row, Td } from '@maru/ui';
import styled from 'styled-components';
import useMaxMinByType from './DetailContent.hooks';
import DetailHeader from '../DetailHeader/DetailHeader';
import { EMPTY_VALUE } from '@/constants/common/constant';

type DetailTableProps = { formList: GradeDistributionType[] | undefined };

const DetailContent = ({ formList }: DetailTableProps) => {
  const data = useMaxMinByType(formList);

  const renderValue = (key: keyof typeof data) => {
    return `${data[key].min} ~ ${data[key].max}`;
  };

  return (
    <StyledDetailTable>
      <Column>
        <DetailHeader />
        <Row>
          <Td width="25%" height={56}>
            일반 전형
          </Td>
          <Td width="25%" height={56}>
            일반 전형
          </Td>
          <Td width="25%" height={56}>
            {null}
          </Td>
          <Td width="12.5%" height={56}>
            {renderValue('regularApplicant')}
          </Td>
          <Td width="12.5%" height={56}>
            {renderValue('regularApplicant')}
          </Td>
        </Row>
        <Row>
          <Td width="25%" height={1288}>
            특별 전형
          </Td>
          <Column width="25%">
            <Td width="100%" height={392}>
              기회균등 전형
            </Td>
            <Td width="100%" height={896}>
              사회다양성 전형
            </Td>
          </Column>
          <Column width="25%">
            <Td width="100%" height={56}>
              국가보훈대상자
            </Td>
            <Td width="100%" height={56}>
              국민기초생활수급권자
            </Td>
            <Td width="100%" height={56}>
              한부모가족 보호대상자
            </Td>
            <Td width="100%" height={56}>
              차상위계층
            </Td>
            <Td width="100%" height={56}>
              차차상위계층
            </Td>
            <Td width="100%" height={56}>
              학교장 추천
            </Td>
            <Td width="100%" height={56}>
              교육감 추천
            </Td>
            <Td width="100%" height={56}>
              다문화가족자녀
            </Td>
            <Td width="100%" height={56}>
              북한이탈청소년
            </Td>
            <Td width="100%" height={56}>
              특수교육대상자
            </Td>
            <Td width="100%" height={56}>
              아동복지시설 보호학생
            </Td>
            <Td width="100%" height={56}>
              소년•소녀 가장
            </Td>
            <Td width="100%" height={56}>
              조손 가정 자녀
            </Td>
            <Td width="100%" height={56}>
              장애인의 자녀
            </Td>
            <Td width="100%" height={56}>
              순직 군경•소방관 등 자녀
            </Td>
            <Td width="100%" height={56}>
              다자녀가정 자녀
            </Td>
          </Column>
          <Column width="12.5%">
            <Td width="100%" height={56}>
              {renderValue('nationalVeteransApplicant')}
            </Td>
            <Td width="100%" height={56}>
              {renderValue('nationalBasicLivingApplicant')}
            </Td>
            <Td width="100%" height={56}>
              {renderValue('oneParentApplicant')}
            </Td>
            <Td width="100%" height={56}>
              {renderValue('nearPovertyApplicant')}
            </Td>
            <Td width="100%" height={56}>
              {renderValue('lowerMiddleApplicant')}
            </Td>
            <Td width="100%" height={56}>
              {renderValue('principalRecommendationApplicant')}
            </Td>
            <Td width="100%" height={56}>
              {renderValue('superintendentRecommendationApplicant')}
            </Td>
            <Td width="100%" height={56}>
              {renderValue('multiculturalApplicant')}
            </Td>
            <Td width="100%" height={56}>
              {renderValue('fromNorthKoreaApplicant')}
            </Td>
            <Td width="100%" height={56}>
              {renderValue('specialEducationStudentApplicant')}
            </Td>
            <Td width="100%" height={56}>
              {renderValue('childWelfareFacilityApplicant')}
            </Td>
            <Td width="100%" height={56}>
              {renderValue('teenHouseholderApplicant')}
            </Td>
            <Td width="100%" height={56}>
              {renderValue('grandfamilyApplicant')}
            </Td>
            <Td width="100%" height={56}>
              {renderValue('disabledParentApplicant')}
            </Td>
            <Td width="100%" height={56}>
              {renderValue('fallenHeroApplicant')}
            </Td>
            <Td width="100%" height={56}>
              {renderValue('multiChildrenApplicant')}
            </Td>
          </Column>
          <Column width="12.5%">
            {[...Array(8)].map((_, i) => (
              <Td key={i} width="100%" height={56}>
                {EMPTY_VALUE}
              </Td>
            ))}
          </Column>
        </Row>
        <Row>
          <Td width="25%" height={112} borderBottomLeftRadius={12}>
            정원 외 전형
          </Td>
          <Column width="25%">
            <Td width="100%" height={56}>
              특례입학 대상자
            </Td>
            <Td width="100%" height={56}>
              국가보훈대상자 중 교육지원대상자
            </Td>
          </Column>
          <Column width="25%">
            <Td width="100%" height={56}>
              특례입학 대상자
            </Td>
            <Td width="100%" height={56}>
              국가보훈대상자 중 교육지원대상자
            </Td>
          </Column>
          <Column width="12.5%">
            <Td width="100%" height={56}>
              {EMPTY_VALUE}
            </Td>
            <Td width="100%" height={56}>
              {EMPTY_VALUE}
            </Td>
          </Column>
          <Column width="12.5%">
            <Td width="100%" height={56}>
              {EMPTY_VALUE}
            </Td>
            <Td width="100%" height={56} borderBottomRightRadius={12}>
              {EMPTY_VALUE}
            </Td>
          </Column>
        </Row>
      </Column>
    </StyledDetailTable>
  );
};

export default DetailContent;

const StyledDetailTable = styled.div`
  ${font.H2}
  text-align: center;
`;
