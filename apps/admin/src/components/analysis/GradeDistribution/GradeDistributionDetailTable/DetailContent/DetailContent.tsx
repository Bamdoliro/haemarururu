import type { GradeDistributionType } from '@/types/analysis/client';
import { font } from '@maru/design-system';
import { Column, Row, Td } from '@maru/ui';
import styled from '@emotion/styled';
import useMaxMinByType from './DetailContent.hooks';
import DetailHeader from '../DetailHeader/DetailHeader';
import { EMPTY_VALUE } from '@/constants/common/constant';

type DetailTableProps = { formList: GradeDistributionType[] | undefined };

const DetailContent = ({ formList }: DetailTableProps) => {
  const data = useMaxMinByType(formList);
  const renderMax = (k: keyof typeof data) => data[k].max;
  const renderMin = (k: keyof typeof data) => data[k].min;

  const equalOpp = [
    { label: '국가보훈대상자', key: 'nationalVeteransApplicant' },
    { label: '국민기초생활수급자', key: 'nationalBasicLivingApplicant' },
    { label: '한부모가정보호대상자', key: 'oneParentApplicant' },
    { label: '차상위계층', key: 'nearPovertyApplicant' },
    { label: '차차상위계층', key: 'lowerMiddleApplicant' },
    { label: '학교장 추천', key: 'principalRecommendationApplicant' },
    { label: '교육감 추천', key: 'superintendentRecommendationApplicant' },
  ] as const;

  const diversity = [
    { label: '다문화가정 자녀', key: 'multiculturalApplicant' },
    { label: '북한이탈주민 또는 그 자녀', key: 'fromNorthKoreaApplicant' },
    { label: '특수교육대상자', key: 'specialEducationStudentApplicant' },
    { label: '아동복지시설 보호학생', key: 'childWelfareFacilityApplicant' },
    { label: '소년·소녀가장', key: 'teenHouseholderApplicant' },
    { label: '조손가정 자녀', key: 'grandfamilyApplicant' },
    { label: '장애인의 자녀', key: 'disabledParentApplicant' },
    { label: '순직 군경·소방관 등 자녀', key: 'fallenHeroApplicant' },
    { label: '다자녀가정 자녀', key: 'multiChildrenApplicant' },
    { label: '한부모가족 자녀(비법정)', key: 'nonstatutoryoneparentApplicant' },
    { label: '복지시설 운영자·종사자 자녀', key: 'welfarefacilityworkerApplicant' },
    { label: '경찰·군인·소방공무원 자녀', key: 'publicservantApplicant' },
    { label: '환경미화원 자녀', key: 'streetcleanerApplicant' },
    { label: '해외파병군인 자녀', key: 'deployedsoldierApplicant' },
    { label: '우편집배원 자녀', key: 'postmanApplicant' },
    { label: '무형문화재 보유자 자녀', key: 'intangibleculturalheritageApplicant' },
    { label: '선원 자녀', key: 'sailorApplicant' },
  ] as const;

  const specialOut = [
    {
      label: '국가보훈대상자 중 교육지원대상자',
      key: 'nationalveteranseducationApplicant',
    },
    { label: '특례입학 대상자', key: 'specialadmissionApplicant' },
  ] as const;

  const allSpecial = [...equalOpp, ...diversity];

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
            {EMPTY_VALUE}
          </Td>
          <Td width="12.5%" height={56}>
            {renderMax('regularApplicant')}
          </Td>
          <Td width="12.5%" height={56}>
            {renderMin('regularApplicant')}
          </Td>
        </Row>

        <Row>
          <Td width="25%" height={allSpecial.length * 56}>
            특별 전형
          </Td>
          <Column width="25%">
            <Td width="100%" height={equalOpp.length * 56}>
              기회균등 전형
            </Td>
            <Td width="100%" height={diversity.length * 56}>
              사회다양성 전형
            </Td>
          </Column>
          <Column width="25%">
            {allSpecial.map((it) => (
              <Td key={it.key} width="100%" height={56}>
                {it.label}
              </Td>
            ))}
          </Column>
          <Column width="12.5%">
            {allSpecial.map((it) => (
              <Td key={`${it.key}-max`} width="100%" height={56}>
                {renderMax(it.key as keyof typeof data)}
              </Td>
            ))}
          </Column>
          <Column width="12.5%">
            {allSpecial.map((it) => (
              <Td key={`${it.key}-min`} width="100%" height={56}>
                {renderMin(it.key as keyof typeof data)}
              </Td>
            ))}
          </Column>
        </Row>

        <Row>
          <Td width="25%" height={specialOut.length * 56} borderBottomLeftRadius={12}>
            정원 외 전형
          </Td>
          <Column width="25%">
            {specialOut.map((s) => (
              <Td key={`${s.key}-L`} width="100%" height={56}>
                {s.label}
              </Td>
            ))}
          </Column>
          <Column width="25%">
            {specialOut.map((s) => (
              <Td key={`${s.key}-R`} width="100%" height={56}>
                {s.label}
              </Td>
            ))}
          </Column>
          <Column width="12.5%">
            {specialOut.map((s) => (
              <Td key={`${s.key}-max`} width="100%" height={56}>
                {renderMax(s.key as keyof typeof data)}
              </Td>
            ))}
          </Column>
          <Column width="12.5%">
            {specialOut.map((s, i) => (
              <Td
                key={`${s.key}-min`}
                width="100%"
                height={56}
                {...(i === specialOut.length - 1 ? { borderBottomRightRadius: 12 } : {})}
              >
                {renderMin(s.key as keyof typeof data)}
              </Td>
            ))}
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
