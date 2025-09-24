import { color, font } from '@maru/design-system';
import { Text } from '@maru/ui';
import { flex } from '@maru/utils';
import type { CSSProperties } from 'styled-components';
import { styled } from 'styled-components';

const EqualTable = () => {
  return (
    <StyledEqualTable>
      <thead>
        <Tr>
          <Th style={{ borderTopLeftRadius: '12px' }} width={120}>
            지원 구분
          </Th>
          <Th style={{ borderTopRightRadius: '12px' }} width={696}>
            제출 서류
          </Th>
        </Tr>
      </thead>
      <tbody>
        <Tr>
          <Td width={120} height={66}>
            공통
          </Td>
          <Td
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              padding: '20px 8px',
            }}
            width={696}
            height={66}
          >
            <Text color={color.haeMaruDefault} fontType="p2">
              <li>사회통합전형 대상자(재학 학교장 및 학부모) 확인서 1부*</li>
            </Text>
          </Td>
        </Tr>
        <Tr>
          <Td width={120} height={66}>
            국가보훈대상자
          </Td>
          <Td
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              padding: '20px 8px',
            }}
            width={696}
            height={66}
          >
            <li>국가보훈대상자 확인원 또는 교육지원 대상자 증명서 1부*</li>
          </Td>
        </Tr>
        <Tr>
          <Td width={120} height={66}>
            <div style={{ textAlign: 'center' }}>
              국민기초생활
              <br />
              수급권자
            </div>
          </Td>
          <Td
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              padding: '20px 8px',
            }}
            width={696}
            height={66}
          >
            <li>수급자 증명서 1부</li>
          </Td>
        </Tr>
        <Tr>
          <Td width={120} height={66}>
            <div style={{ textAlign: 'center' }}>
              한부모가족
              <br />
              보호대상자
            </div>
          </Td>
          <Td
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              padding: '20px 8px',
            }}
            width={696}
            height={66}
          >
            <li>한부모가족 증명서 1부</li>
          </Td>
        </Tr>
        <Tr>
          <Td width={120} height={92}>
            차상위계층
          </Td>
          <Td
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              padding: '20px 8px',
            }}
            width={696}
            height={92}
          >
            <li>
              자활근로자 확인서, 차상위 본인부담경감대상자 증명서,
              장애인연금•장애수당•장애아 수당 대상자 확인서, 교육급여 수증자 증명서 중 1부
            </li>
          </Td>
        </Tr>
        <Tr>
          <Td width={120} height={66}>
            차차상위계층
          </Td>
          <Td
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              padding: '20px 8px',
            }}
            width={696}
            height={66}
          >
            <li>교육비지원 확인서 1부</li>
          </Td>
        </Tr>
        <Tr>
          <Td width={120} height={126}>
            학교장 추천
          </Td>
          <Td
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              padding: '20px 8px',
            }}
            width={696}
            height={126}
          >
            <li>
              실직급여수급증 사본, 채권압류통지서, 법원 파산 결정문 사본, 폐업확인서,
              지역건강보험료 영수증, 급여명세서 중 해당 증빙서류 1부
            </li>
            <li>학교장 추천위원회(재학 중학교)의견서 [서식3] 1부</li>
          </Td>
        </Tr>
        <Tr>
          <Td
            style={{ borderBottomLeftRadius: '12px', textAlign: 'center' }}
            width={120}
            height={126}
          >
            교육감 추천
          </Td>
          <Td
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              padding: '20px 8px',
              borderBottomRightRadius: '12px',
            }}
            width={696}
            height={126}
          >
            <li>
              실직급여수급증 사본, 채권압류통지서, 법원 파안 결정문 사본, 폐업확인서,
              지역건강보험료 영수증, 급여명세서 중 해당 증빙서류 1부
            </li>
            <li>교육감 추천위원회 의견서 1부</li>
          </Td>
        </Tr>
      </tbody>
    </StyledEqualTable>
  );
};

export default EqualTable;

const StyledEqualTable = styled.div`
  width: 100%;
  border-radius: 12px;
  border-collapse: collapse;
`;

const Tr = styled.tr`
  ${flex({ alignItems: 'center' })}
`;

const Th = styled.th<{ width: CSSProperties['width'] }>`
  ${flex({ justifyContent: 'center', alignItems: 'center' })}
  width: ${(props) => props.width};
  height: 56px;
  border: 1px solid ${color.gray300};
  background-color: ${color.gray50};
  color: ${color.gray900};
  ${font.context}
`;

const Td = styled.td<{ width: CSSProperties['width']; height: CSSProperties['height'] }>`
  ${flex({ justifyContent: 'center', alignItems: 'center' })}
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border: 1px solid ${color.gray300};
  background-color: ${color.white};
  color: ${color.gray900};
  ${font.p2}
`;
