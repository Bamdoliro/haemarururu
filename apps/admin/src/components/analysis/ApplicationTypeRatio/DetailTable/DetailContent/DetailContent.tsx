import type { ApplicantCountType } from '@/types/analysis/client';
import { font } from '@maru/design-system';
import { Column, Row, Td } from '@maru/ui';
import styled from 'styled-components';
import useApplicantRatios from './DetailContent.hooks';
import DetailHeader from '../DetailHeader/DetailHeader';
import { EMPTY_VALUE } from '@/constants/common/constant';

type DetailTableProps = { formList: ApplicantCountType[] | undefined };

const DetailContent = ({ formList }: DetailTableProps) => {
  const {
    regularApplicant,
    nationalVeteransApplicant,
    nationalBasicLivingApplicant,
    oneParentApplicant,
    nearPovertyApplicant,
    lowerMiddleApplicant,
    principalRecommendationApplicant,
    superintendentRecommendationApplicant,
    multiculturalApplicant,
    fromNorthKoreaApplicant,
    specialEducationStudentApplicant,
    childWelfareFacilityApplicant,
    teenHouseholderApplicant,
    grandfamilyApplicant,
    disabledParentApplicant,
    fallenHeroApplicant,
    multiChildrenApplicant,
  } = useApplicantRatios(formList);

  return (
    <StyledDetailTable>
      <Column>
        <DetailHeader />
        <Row>
          <Td width="30%" height={56}>
            일반 전형
          </Td>
          <Td width="30%" height={56}>
            일반 전형
          </Td>
          <Td width="30%" height={56}>
            {regularApplicant}
          </Td>
          <Td width="10%" height={56}>
            {regularApplicant}
          </Td>
        </Row>
        <Row>
          <Td width="30%" height={1288}>
            사회 통합 전형
          </Td>
          <Column width="30%">
            <Td width="100%" height={392}>
              기회균등 전형
            </Td>
            <Td width="100%" height={896}>
              사회 다양성 전형
            </Td>
          </Column>
          <Column width="30%">
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
            <Td width="100%" height={56}>
              한부모가족 자녀(비법정)
            </Td>
            <Td width="100%" height={56}>
              복지시설 운영자•종사자 자녀
            </Td>
            <Td width="100%" height={56}>
              경찰•군인•소방공무원 자녀
            </Td>
            <Td width="100%" height={56}>
              환경미화원 자녀
            </Td>
            <Td width="100%" height={56}>
              해외파병군인 자녀
            </Td>
            <Td width="100%" height={56}>
              무형문화재 보유자 자녀
            </Td>
            <Td width="100%" height={56}>
              선원 자녀
            </Td>
          </Column>
          <Column width="10%">
            {[
              nationalVeteransApplicant,
              nationalBasicLivingApplicant,
              oneParentApplicant,
              nearPovertyApplicant,
              lowerMiddleApplicant,
              principalRecommendationApplicant,
              superintendentRecommendationApplicant,
              multiculturalApplicant,
              fromNorthKoreaApplicant,
              specialEducationStudentApplicant,
              childWelfareFacilityApplicant,
              teenHouseholderApplicant,
              grandfamilyApplicant,
              disabledParentApplicant,
              fallenHeroApplicant,
              multiChildrenApplicant,
              EMPTY_VALUE,
              EMPTY_VALUE,
              EMPTY_VALUE,
              EMPTY_VALUE,
              EMPTY_VALUE,
              EMPTY_VALUE,
              EMPTY_VALUE,
              EMPTY_VALUE,
            ].map((ratio, i) => (
              <Td key={i} width="100%" height={56}>
                {ratio}
              </Td>
            ))}
          </Column>
        </Row>
        <Row>
          <Td width="30%" height={112} borderBottomLeftRadius={12}>
            정원 외 전형
          </Td>
          <Column width="30%">
            <Td width="100%" height={56}>
              특례입학 대상자
            </Td>
            <Td width="100%" height={56}>
              국가보훈대상자 중 교육지원대상자
            </Td>
          </Column>
          <Column width="30%">
            <Td width="100%" height={56}>
              특례입학 대상자
            </Td>
            <Td width="100%" height={56}>
              국가보훈대상자 중 교육지원대상자
            </Td>
          </Column>
          <Column width="10%">
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
