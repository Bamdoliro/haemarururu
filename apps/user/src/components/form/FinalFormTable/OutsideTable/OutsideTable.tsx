import { color, font } from '@maru/design-system';
import { Text } from '@maru/ui';
import { flex } from '@maru/utils';
import type { CSSProperties } from 'styled-components';
import { styled } from 'styled-components';

const OutsideTable = () => {
  return (
    <StyledOutsideTable>
      <thead>
        <Tr>
          <Th style={{ borderTopLeftRadius: '12px' }} width={120}>
            지원 구분
          </Th>
          <Th style={{ borderTopRightRadius: '12px' }} width={697}>
            제출 서류
          </Th>
        </Tr>
      </thead>
      <tbody>
        <Tr>
          <Td width={120} height={476}>
            <Text fontType="p2" color={color.gray900} textAlign="center">
              초•중등 교육법
              <br />
              시행령
              <br />
              제82조 제3항
              <br />
              제1호 해당자
            </Text>
          </Td>
          <Td
            width={697}
            height={476}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              padding: '20px 8px',
              gap: '6px',
            }}
          >
            외국에서 9년 이상의 학교교육을 이수한 자<li>확인서 1부</li>
            <li>외국 학교 전 학년 성적증명서 1부</li>
            <li>외국 학교 전 학년 재학증명서(또는 졸업증명서) 1부</li>
            <li>출입국 사실 증명서(학생, 부, 모 모두) 1부</li>
            <li>전 가족이 등재된 주민등록등본 1부</li>
            <br />
            군사분계선 이북지역에서 9년 이상이 학교교육을 이수한 자
            <li>북한이탈주민 등록확인서 1부</li>
            <li>학력확인서 1부</li>
            <li>교육지원대상자 증명서 1부</li>
            <li>학력인정증명서 1부</li>
          </Td>
        </Tr>
        <Tr>
          <Td width={120} height={476}>
            <Text fontType="p2" color={color.gray900} textAlign="center">
              초•중등
              <br />
              교육법 시행령
              <br />
              제82조 제3항
              <br />
              제2호 가목 해당자
            </Text>
          </Td>
          <Td
            width={697}
            height={476}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              padding: '20px 8px',
              gap: '11px',
            }}
          >
            <li>확인서 1부</li>
            <li>외국 학교 전 학년 성적증명서 1부</li>
            <li>외국 학교 전 학년 재학증명서(또는 졸업증명서) 1부</li>
            <li>국내 최종학교 재학(정원 외 관리, 재학 사실) 또는 졸업증명서 1부</li>- 최종
            재학 학년 및 최종 재학 연월일이 명시되어 있어야 함
            <li>출입국 사실 증명서(학생, 부, 모 모두) 1부</li>
            <li>전 가족이 등재된 주민등록등본 1부</li>
            -재외동포 자녀인 경우 ① 말소된 주민등록등본 1부 제출 또는 ② 국내 거소사실 증
            <li>명서(또는 영주권 사본) 1부 제출</li>
            <li>재외국민등록부 등본(학생, 부, 모, 모두) 1부</li>-재외국민 미등록 시 거주
            사실을 증명할 수 있는 각종 문서 제출 필요
          </Td>
        </Tr>
        <Tr>
          <Td width={120} height={340}>
            <Text fontType="p2" color={color.gray900} textAlign="center">
              초•중등
              <br />
              교육법 시행령
              <br />
              제82조 제3항
              <br />
              제2호 나목 해당자
            </Text>
          </Td>
          <Td
            width={697}
            height={340}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              padding: '20px 8px',
              gap: '5px',
            }}
          >
            <li>확인서 1부</li>
            <li>외국 학교 전 학년 성적증명서 1부</li>
            <li>외국 학교 전 학년 재학증명서(또는 졸업증명서) 1부</li>
            <li>국내 최종학교 재학(정원 외 관리, 재학사실) 또는 졸업증명서 1부</li>- 최종
            재학 학년 및 최종 재학 연월일이 명시되어 있어야 함
            <li>출입국 사실 증명서(학생, 부, 모, 모두) 1부</li>
            <li>전 가족이 등재된 주민등록등본 1부</li>- 재외동포 자녀인 경우 거소사실
            증명, 영주권(시민권) 사본 제출
            <li>대한민국 정부 초청 또는 추천서 사본 1부</li>
          </Td>
        </Tr>
        <Tr>
          <Td width={120} height={392}>
            <Text fontType="p2" color={color.gray900} textAlign="center">
              초•중등
              <br />
              교육법 시행령
              <br />
              제82조 제3항
              <br />
              제2호 다목 해당자
            </Text>
          </Td>
          <Td
            width={697}
            height={392}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              padding: '20px 8px',
              gap: '5px',
            }}
          >
            <li>확인서 1부</li>
            <li>외국 학교 전 학년 성적증명서 1부</li>
            <li>외국 학교 전 학년 재학증명서(또는 졸업증명서) 1부</li>
            <li>국내 최종학교 재학(정원 외 관리, 재학사실) 또는 졸업증명서 1부</li>- 최종
            재학 학년 및 최종 재학 연월일이 명시되어 있어야 함
            <li>출입국 사실 증명서(학생만 제출) 1부</li>
            <li>가족관계 증명서 1부</li>- 부모 중 1인이 대한민국 국민인 경우 발급
            가능(외국인의 경우 국내거소사실증명서)
            <li>외국인 등록사실 증명 1부 또는 외국인 등록증 사본 1부</li>- 부모 모두
            외국인인 경우: 부모와 학생 모두 제출
            <br />- 부모 중 1인이 대한민국 국민인 경우: 학생만 제출
          </Td>
        </Tr>
        <Tr>
          <Td width={120} height={202}>
            <Text fontType="p2" color={color.gray900} textAlign="center">
              초•중등
              <br />
              교육법 시행령
              <br />
              제82조 제3항
              <br />
              제3호 해당자
              <br />
            </Text>
          </Td>
          <Td
            width={697}
            height={202}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              padding: '20px 8px',
              gap: '8px',
            }}
          >
            <li>전 가족이 등재된 주민등록등본 1부</li>
            <li>북한이탈주민 등록확인서 1부</li>
            <li>학력확인서 1부 - 북한에서 반드시 중학교 과정의 일부를 이수하여야 함</li>
            <li>교육지원대상자 증명서 1부</li>
          </Td>
        </Tr>
        <Tr>
          <Td width={120} height={236}>
            <Text fontType="p2" color={color.gray900} textAlign="center">
              초•중등
              <br />
              교육법 시행령
              <br />
              제82조 제3항
              <br />
              제4호 해당자
            </Text>
          </Td>
          <Td
            width={697}
            height={236}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              padding: '20px 8px',
              gap: '10px',
            }}
          >
            <li>전 가족이 등재된 주민등록등본 1부</li>
            <li>교육지원대상자 증명서 1부</li>
            <li>학력인정증명서 1부</li>
            <li>북한이탈주민 등록확인서 1부</li>
            <li>학력확인서 1부</li>
          </Td>
        </Tr>
        <Tr>
          <Td
            style={{ borderBottomLeftRadius: '12px', textAlign: 'center' }}
            width={120}
            height={78}
          >
            <Text fontType="p2" color={color.gray900} textAlign="center">
              국가보훈대상자
              <br />
              중 교육지원
              <br />
              대상자 전형
              <br />
            </Text>
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
            height={78}
          >
            <li>공통 제출서류만 제출(입학원서에 지원 전형 표기)</li>
          </Td>
        </Tr>
      </tbody>
    </StyledOutsideTable>
  );
};

export default OutsideTable;

const StyledOutsideTable = styled.div`
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
