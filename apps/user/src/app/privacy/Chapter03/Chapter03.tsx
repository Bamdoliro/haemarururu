import { PolicyRoule } from '@/components/policy';
import { color, font } from '@maru/design-system';
import { styled } from 'styled-components';

type Font = keyof typeof font;

const Chpater03 = () => {
  return (
    <PolicyRoule title="제3조 처리하는 개인정보의 항목">
      <StyledText fontType="p3" color={color.gray900}>
        <ol style={{ marginLeft: '20px' }}>
          <li>
            우리학교는 법령의 규정과 정보주체의 동의에 의해서만 개인정보를 수집ㆍ보유하며,
            개인정보 항목 및 수집 방법은 다음과 같습니다.
            <br />
            <span>
              ▶ 개인정보 항목 :{' '}
              <span style={{ color: `${color.haeMaruDefault}` }}>개인정보 항목 보기</span>
            </span>
          </li>
        </ol>
        열람방법: 개인정보 포털(
        <span style={{ color: `${color.haeMaruDefault}` }}>www.privacy.go.kr</span>){'>'}{' '}
        개인서비스 {'>'} 개인정보 열람등 요구 {'>'} 개인정보파일 검색 ‘해운대고등학교’
        입력 후 검색
        <ol style={{ marginLeft: '20px' }} type="1" start={2}>
          <li>
            우리학교 홈페이지 서비스 이용과정에서 IP주소, 쿠키, MAC주소, 서비스 이용기록,
            방문기록, 불량 이용기록 등의 개인정보 항목이 자동으로 생성되어 수집될 수
            있습니다.
          </li>
        </ol>
      </StyledText>
    </PolicyRoule>
  );
};

export default Chpater03;

const StyledText = styled.div<{ fontType: Font; color: string }>`
  ${({ fontType }) => font[fontType]};
  color: ${(props) => props.color};
`;
