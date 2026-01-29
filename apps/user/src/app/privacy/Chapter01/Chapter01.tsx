import { PolicyRoule } from '@/components/policy';
import { color, font } from '@maru/design-system';
import { Column } from '@maru/ui';
import styled from '@emotion/styled';

type Font = keyof typeof font;

const Chpater01 = () => {
  return (
    <PolicyRoule title="제1조 개인정보의 처리목적">
      <Column gap={8}>
        <StyledText fontType="p3" color={color.gray900}>
          <ol style={{ marginLeft: '20px' }}>
            <li>
              우리학교는 개인정보를 대민서비스 제공 및 민원처리, 소관업무 수행 등의
              목적으로 수집·보유하고 있습니다.
            </li>
            <li>
              수집한 개인정보는 수집 목적 외의 용도로는 사용되지 않으며, 이용 목적이
              변경되는 경우에는 「개인정보 보호법」 제18조에 따라 별도의 동의를 받는 등
              필요한 조치를 이행할 예정입니다.
            </li>
          </ol>
        </StyledText>
      </Column>
    </PolicyRoule>
  );
};

export default Chpater01;

const StyledText = styled.div<{ fontType: Font; color: string }>`
  ${({ fontType }) => font[fontType]};
  color: ${(props) => props.color};
`;
