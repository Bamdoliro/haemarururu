import { PolicyRoule } from '@/components/policy';
import { color, font } from '@maru/design-system';
import { styled } from 'styled-components';

type Font = keyof typeof font;

const Chpater07 = () => {
  return (
    <PolicyRoule title="제7조 개인정보 자동 수집 장치의 설치·운영 및 거부">
      <StyledText fontType="p3" color={color.gray900}>
        <ol style={{ marginLeft: '20px' }}>
          <li>
            우리학교는 이용자에게 개별적인 맞춤서비스를 제공하기 위해 이용 정보를 저장하고
            수시로 불러오는 ‘쿠키(cookie)’를 사용합니다.
          </li>
          <li>
            쿠키는 웹사이트를 운영하는데 이용되는 서버(http)가 이용자의 컴퓨터
            브라우저에게 보내는 소량의 정보이며 이용자들의 PC 내의 하드디스크에 저장되기도
            합니다.
          </li>
        </ol>
        <li style={{ marginLeft: '20px' }}>
          가. 쿠키의 사용목적: 이용자가 방문한 각 서비스와 이용형태, 인기 검색어 등을
          파악하여 이용자에게 보다 편리한 서비스를 제공하기 위해 사용됩니다.
        </li>
        <li style={{ marginLeft: '20px' }}>
          나. 쿠키의 설치·운영 및 거부: 웹브라우저 옵션 설정을 통해 쿠키 허용, 쿠키 차단
          등의 설정을 할 수 있습니다.
        </li>
        <li style={{ marginLeft: '40px' }}>
          Edge: 웹브라우저 우측 상단의 설정 메뉴 {'>'} 쿠키 및 사이트 권한 {'>'} 쿠키 및
          사이트 데이터 관리 및 삭제
        </li>
        <li style={{ marginLeft: '20px' }}>
          Chrome: 웹브라우저 우측 상단의 설정 메뉴 {'>'} 개인정보 및 보안 {'>'} 쿠키 및
          기타 사이트 데이터
        </li>
        <li style={{ marginLeft: '20px' }}>
          Whale: 웹브라우저 우측 상단의 설정 메뉴 {'>'} 개인정보 보호 {'>'} 쿠키 및 기타
          사이트 데이터
        </li>
        <li style={{ marginLeft: '20px' }}>
          다. 쿠키 저장을 거부할 경우 맞춤형 서비스 이용에 어려움이 발생할 수 있습니다.
        </li>
      </StyledText>
    </PolicyRoule>
  );
};

export default Chpater07;

const StyledText = styled.div<{ fontType: Font; color: string }>`
  ${({ fontType }) => font[fontType]};
  color: ${(props) => props.color};
`;
