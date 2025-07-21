import { PolicyRoule } from '@/components/policy';
import { color, font } from '@maru/design-system';
import { Column } from '@maru/ui';
import { styled } from 'styled-components';

type Font = keyof typeof font;

const Chpater02 = () => {
  return (
    <Column gap={36}>
      <PolicyRoule title="제2조 개인정보의 처리 및 보유기간">
        <StyledText fontType="p3" color={color.gray900}>
          <ol style={{ marginLeft: '20px' }}>
            <li>
              우리학교는 「개인정보 보호법」 및 관련 법령에서 정하는 보유·이용기간 또는
              정보주체로부터 개인정보를 수집 시 동의받은 개인정보 보유·이용 기간내에서
              개인정보를 처리합니다.
            </li>
            <li>
              우리학교에서 보유하고 있는 개인정보 처리 및 보유기간의 조회 방법은 다음과
              같습니다.
            </li>
          </ol>
          <span style={{ marginLeft: '20px' }}>
            ▶ 개인정보 처리 및 보유기간 :{' '}
            <span style={{ color: `${color.haeMaruDefault}` }}>
              개인정보 처리 및 보유기간 보기
            </span>
          </span>
          <br />
          <br />
          열람방법: 개인정보 포털(
          <span style={{ color: `${color.haeMaruDefault}` }}>
            www.privacy.go.kr
          </span>) {'>'} 개인서비스 {'>'} 개인정보 열람등 요구 {'>'} 개인정보파일 검색{' '}
          {'>'} 기관명 ‘해운대고등학교’ 입력 후 검색
        </StyledText>
      </PolicyRoule>
    </Column>
  );
};

export default Chpater02;

const StyledText = styled.div<{ fontType: Font; color: string }>`
  ${({ fontType }) => font[fontType]};
  color: ${(props) => props.color};
`;
