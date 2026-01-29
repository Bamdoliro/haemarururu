import { PolicyRoule } from '@/components/policy';
import { color, font } from '@maru/design-system';
import styled from '@emotion/styled';

type Font = keyof typeof font;

const Chpater10 = () => {
  return (
    <PolicyRoule title="제10조 개인정보 처리방침 변경">
      <StyledText fontType="p3" color={color.gray900}>
        <li style={{ marginLeft: '20px' }}>
          이 개인정보 처리방침은 2024/09/04부터 적용됩니다. 이전의 개인정보 처리방침은
          아래에서 확인하실 수 있습니다.
        </li>
        <li style={{ marginLeft: '20px', color: `${color.haeMaruDefault}` }}>
          우리학교 홈페이지 {'>'} 학교소식 {'>'} 개인정보보호 {'>'} 개인정보처리방침 이력
          {'>'}「개인정보처리방침 이력」
        </li>
      </StyledText>
    </PolicyRoule>
  );
};

export default Chpater10;

const StyledText = styled.div<{ fontType: Font; color: string }>`
  ${({ fontType }) => font[fontType]};
  color: ${(props) => props.color};
`;
