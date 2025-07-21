import { PolicyRoule } from '@/components/policy';
import { color, font } from '@maru/design-system';
import { styled } from 'styled-components';

type Font = keyof typeof font;

const Chpater09 = () => {
  return (
    <PolicyRoule title="제9조 개인정보의 안전성 확보 조치">
      <StyledText fontType="p3" color={color.gray900}>
        <ol style={{ marginLeft: '20px' }}>
          <li>
            우리학교는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.
          </li>
        </ol>
        <li style={{ marginLeft: '30px' }}>
          1. 관리적 조치: 내부관리계획 수립․시행, 정기적 직원 교육
        </li>
        <li style={{ marginLeft: '30px' }}>
          2. 기술적 조치: 개인정보처리시스템 등의 접근권한 관리, 접근통제시스템 설치,
          고유식별정보 등의 암호화, 보안프로그램 설치
        </li>
        <li style={{ marginLeft: '30px' }}>
          3. 물리적 조치: 전산실, 자료보관실 등의 접근통제
        </li>
      </StyledText>
    </PolicyRoule>
  );
};

export default Chpater09;

const StyledText = styled.div<{ fontType: Font; color: string }>`
  ${({ fontType }) => font[fontType]};
  color: ${(props) => props.color};
`;
