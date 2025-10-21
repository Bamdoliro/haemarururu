import { color, font } from '@maru/design-system';
import { Column, Text } from '@maru/ui';
import { flex } from '@maru/utils';
import type { CSSProperties } from 'styled-components';
import styled from 'styled-components';
import { SCHEDULE } from '@/constants/form/constants';
import { formatScheduleDate } from '@/utils';

const CommonTable = () => {
  return (
    <StyledCommonTable>
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
          <Td width={120} height={500}>
            전원
          </Td>
          <Td
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              padding: '20px 8px',
            }}
            width={696}
            height={500}
          >
            <Column gap={15}>
              <Text color={color.haeMaruDefault} fontType="p2">
                1. 입학원서(본교 소정양식) 1부*
              </Text>
              <li>
                온라인 원서접수 후 출력하여, 담임교사 확인(날인) 및 학교장 직인 날인
              </li>
              <li>학업성취도란에 투명 테이프 부착</li>
              <Text color={color.haeMaruDefault} fontType="p2">
                2. 학교생활기록부(||) 사본 2부(단면출력, 원본대조필, 학교장 직인 날인 및
                간인)
              </Text>
              <li>
                학생부||(‘상급학교제출용’)출력 옵션 중 ‘서울 이외 방식 자사고•일반고
                입시용’ 탭을 선택하여 다음 사항들이 반영되도록 출력함
              </li>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  padding: '0px 20px',
                }}
              >
                <li>수상경력(3번) 제외</li>
                <li>교과학습발달상황(5번) 내 원점수/표준편차 제외</li>
                <li>교과학습발달상황(5번) 세부능력 및 특기사항 중 영재기록사항 제외</li>
                <li>교과학습발달상황(5번) 내 중학교 3학년의 세부능력 및 특기사항 제외</li>
                <li>행동특성 및 종합의견(8번) 내 중학교 3학년 내용 제외</li>
                <li>
                  출결 기준일
                  <Text color={color.red} fontType="p2">
                    {formatScheduleDate([SCHEDULE.출결_기준일], 'STANDARD')}
                  </Text>
                  까지 출결 사항이 반영되도록 마감하여 출력 (특기사항란에 기준일 기재)
                </li>
              </div>
              <Text color={color.haeMaruDefault} fontType="p2">
                3. 자기소개서(본교 소정양식) 1부*
              </Text>
              <Text color={color.haeMaruDefault} fontType="p2">
                4. 학교생활기록부(||) 사본 2부(단면출력, 원본대조필, 학교장 직인 날인 및
                간인)
              </Text>
            </Column>
          </Td>
        </Tr>
        <Tr>
          <Td width={120} height={100} style={{ textAlign: 'center' }}>
            혁신도시 이전
            <br />
            공공기관 종사자
            <br />
            자녀
          </Td>
          <Td
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              padding: '20px 8px',
            }}
            width={696}
            height={100}
          >
            <li>재직 증명서 1부</li>
            <li>보호자(공공기관 종사자)의 주민등록등본 1부</li>
          </Td>
        </Tr>
        <Tr>
          <Td width={120} height={134}>
            중학교 졸업학력
            <br />
            검정고시 합격자
          </Td>
          <Td
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              padding: '20px 8px',
            }}
            width={696}
            height={134}
          >
            <li>중학교 졸업 학력 검정고시 합격증명서 1부</li>
            <li>
              중학교 졸업 학력 검정고시 성적증명서 1부 (발급처: 시교육청, 교육지원청,
              지방자치단체, 정부24)
            </li>
            <li>주민등록등본(보호자 포함) 1부</li>
          </Td>
        </Tr>
        <Tr>
          <Td
            style={{ borderBottomLeftRadius: '12px', textAlign: 'center' }}
            width={120}
            height={130}
          >
            타 시•도
            <br />
            자율중학교,
            <br />
            특성화중학교의
            <br />
            졸업자 및<br />
            졸업 예정자
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
            height={130}
          >
            <li>주민등록등본(보호자 포함) 1부</li>
          </Td>
        </Tr>
      </tbody>
    </StyledCommonTable>
  );
};

export default CommonTable;

const StyledCommonTable = styled.div`
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
