import { color, font } from '@maru/design-system';
import { Text } from '@maru/ui';
import { flex } from '@maru/utils';
import type { CSSProperties } from 'react';
import styled from '@emotion/styled';

const ManifoldTable = () => {
  return (
    <StyledManifoldTable>
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
          <Td width={120} height={202}>
            공통
          </Td>
          <Td
            width={696}
            height={202}
            style={{
              display: 'flex',
              gap: '6px',
              flexDirection: 'column',
              alignItems: 'flex-start',
              padding: '20px 8px',
            }}
          >
            <Text fontType="p2" color={color.haeMaruDefault}>
              <li>사회통합전형 대상자(재학 학교장 및 학부모) 확인서 1부*</li>
            </Text>
            <li>소득 8분위(기준 중위 소득 160%) 이하 증빙서류</li>
            1) 최근 10개월 간 건강보험료 납부 확인서 또는 영수증 (부,모 모두) 1부 <br />
            2) 건강보험증 사본 또는 건강보험 자격확인서 1부 <br />
            3) 건강보험자격 득실확인서 (부,모 모두) 1부
          </Td>
        </Tr>
        <Tr>
          <Td width={120} height={168}>
            <Text fontType="p2" color={color.gray900} textAlign="center">
              다문화가족
              <br />
              자녀
            </Text>
          </Td>
          <Td
            width={696}
            height={168}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              alignItems: 'flex-start',
              padding: '20px 8px',
            }}
          >
            <li>혼인관계증명서 1부</li>
            <li>가족관계증명서 1부</li>
            <li>외국인등록 증명서 1부</li>
            <li>귀화증명서 1부</li>
          </Td>
        </Tr>
        <Tr>
          <Td width={120} height={66}>
            특수교육대상자
          </Td>
          <Td
            width={696}
            height={66}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              alignItems: 'flex-start',
              padding: '20px 8px',
            }}
          >
            <li>특수교육대상자 확인원 1부</li>
          </Td>
        </Tr>
        <Tr>
          <Td width={120} height={100}>
            북한이탈청소년
          </Td>
          <Td
            width={696}
            height={100}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              alignItems: 'flex-start',
              padding: '20px 8px',
            }}
          >
            <li>가족관계증명서 1부</li>
            <li>북한이탈주민 보호대상자 결정통지서 또는 북한이탈주민등록확인서 1부</li>
          </Td>
        </Tr>
        <Tr>
          <Td width={120} height={66}>
            <Text fontType="p2" color={color.gray900} textAlign="center">
              아동복지시설
              <br />
              보호학생
            </Text>
          </Td>
          <Td
            width={696}
            height={66}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              alignItems: 'flex-start',
              padding: '20px 8px',
            }}
          >
            <li>복지시설재원증명서 1부</li>
          </Td>
        </Tr>
        <Tr>
          <Td width={120} height={100}>
            <Text fontType="p2" color={color.gray900} textAlign="center">
              소년•소녀
              <br />
              가장
            </Text>
          </Td>
          <Td
            width={696}
            height={100}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              alignItems: 'flex-start',
              padding: '20px 8px',
            }}
          >
            <li>가족관계증명서 1부</li>
            <li>주민등록등본 1부</li>
          </Td>
        </Tr>
        <Tr>
          <Td width={120} height={100}>
            조손 가정 자녀
          </Td>
          <Td
            width={696}
            height={100}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              alignItems: 'flex-start',
              padding: '20px 8px',
            }}
          >
            <li>가족관계증명서 또는 제적등본 1부</li>
            <li>주민등록등본 1부</li>
          </Td>
        </Tr>
        <Tr>
          <Td width={120} height={134}>
            장애인의 자녀
          </Td>
          <Td
            width={696}
            height={134}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              alignItems: 'flex-start',
              padding: '20px 8px',
            }}
          >
            <li>가족관계증명서 1부</li>
            <li>장애인 증명서 1부</li>
            <li>주민등록등본 1부</li>
          </Td>
        </Tr>
        <Tr>
          <Td width={120} height={100}>
            <Text fontType="p2" color={color.gray900} textAlign="center">
              순직 군경•
              <br />
              소방관 등 자녀
            </Text>
          </Td>
          <Td
            width={696}
            height={100}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              alignItems: 'flex-start',
              padding: '20px 8px',
            }}
          >
            <li>가족관계증명서 1부</li>
            <li>순직확인서 또는 의사자 증서 사본 1부</li>
          </Td>
        </Tr>
        <Tr>
          <Td width={120} height={66}>
            다자녀가정 자녀
          </Td>
          <Td
            width={696}
            height={66}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              alignItems: 'flex-start',
              padding: '20px 8px',
            }}
          >
            <li>가족관계증명서(학부모 기준) 1부</li>
          </Td>
        </Tr>
        <Tr>
          <Td width={120} height={100}>
            <Text fontType="p2" color={color.gray900} textAlign="center">
              한부모가족
              <br />
              자녀(비법정)
            </Text>
          </Td>
          <Td
            width={696}
            height={100}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              alignItems: 'flex-start',
              padding: '20px 8px',
            }}
          >
            <li>가족관계증명서 1부</li>
            <li>주민등록등본 1부</li>
          </Td>
        </Tr>
        <Tr>
          <Td width={120} height={134}>
            <Text fontType="p2" color={color.gray900} textAlign="center">
              복지시설
              <br />
              운영자•종사자
              <br />
              자녀
            </Text>
          </Td>
          <Td
            width={696}
            height={134}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              alignItems: 'flex-start',
              padding: '20px 8px',
            }}
          >
            <li>가족관계증명서 1부</li>
            <li>재직증명서(재직 기간 명시) 1부</li>
            <li>사회복지시설 신고증 사본 1부</li>
          </Td>
        </Tr>
        <Tr>
          <Td width={120} height={100}>
            <Text fontType="p2" color={color.gray900} textAlign="center">
              경찰•군인•소방
              <br />
              공무원 자녀
            </Text>
          </Td>
          <Td
            width={696}
            height={100}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              alignItems: 'flex-start',
              padding: '20px 8px',
            }}
          >
            <li>가족관계증명서 1부</li>
            <li>재직증명서(재직 기간 명시) 1부</li>
          </Td>
        </Tr>
        <Tr>
          <Td width={120} height={100}>
            <Text fontType="p2" color={color.gray900} textAlign="center">
              환경미화원
              <br />
              자녀
            </Text>
          </Td>
          <Td
            width={696}
            height={100}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              alignItems: 'flex-start',
              padding: '20px 8px',
            }}
          >
            <li>가족관계증명서 1부</li>
            <li>재직증명서(재직 기간 명시) 1부</li>
          </Td>
        </Tr>
        <Tr>
          <Td width={120} height={100}>
            <Text fontType="p2" color={color.gray900} textAlign="center">
              해외파병군인
              <br />
              자녀
            </Text>
          </Td>
          <Td
            width={696}
            height={100}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              alignItems: 'flex-start',
              padding: '20px 8px',
            }}
          >
            <li>가족관계증명서 1부</li>
            <li>파병기록이 있는 병적증명서 1부</li>
          </Td>
        </Tr>
        <Tr>
          <Td width={120} height={100}>
            <Text fontType="p2" color={color.gray900} textAlign="center">
              무형문화재
              <br />
              보유자 자녀
            </Text>
          </Td>
          <Td
            width={696}
            height={100}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              alignItems: 'flex-start',
              padding: '20px 8px',
            }}
          >
            <li>가족관계증명서 1부</li>
            <li>무형문화재 인증서(사본) 1부</li>
          </Td>
        </Tr>
        <Tr>
          <Td width={120} height={100}>
            <Text fontType="p2" color={color.gray900} textAlign="center">
              우편집배원
              <br />
              자녀
            </Text>
          </Td>
          <Td
            width={696}
            height={100}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              alignItems: 'flex-start',
              padding: '20px 8px',
            }}
          >
            <li>가족관계증명서 1부</li>
            <li>재직증명서(재직 기간 명시) 1부</li>
          </Td>
        </Tr>
        <Tr>
          <Td
            style={{ borderBottomLeftRadius: '12px', textAlign: 'center' }}
            width={120}
            height={100}
          >
            선원 자녀
          </Td>
          <Td
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              alignItems: 'flex-start',
              padding: '20px 8px',
              borderBottomRightRadius: '12px',
            }}
            width={696}
            height={100}
          >
            <li>가족관계증명서 1부</li>
            <li>승선(승무)경력증명서 1부</li>
          </Td>
        </Tr>
      </tbody>
    </StyledManifoldTable>
  );
};

export default ManifoldTable;

const StyledManifoldTable = styled.div`
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

  li {
    margin: 0 16px;
    list-style-type: '- ';
  }
`;
