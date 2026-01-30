import { PolicyRoule } from '@/components/policy';
import { color, font } from '@maru/design-system';
import { Column } from '@maru/ui';
import styled from '@emotion/styled';

type Font = keyof typeof font;

const Chpater08 = () => {
  return (
    <PolicyRoule title="제8조 개인정보의 파기 절차 및 방법">
      <Column gap={8}>
        <StyledText fontType="p3" color={color.gray900}>
          <ol style={{ marginLeft: '20px' }}>
            <li>
              우리학교는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게
              되었을 때에는 지체 없이 해당 개인정보를 파기합니다.
            </li>
            <li>
              정보주체로부터 동의 받은 개인정보의 보유기간이 경과하거나 처리목적이
              달성되었음에도 불구하고 다른 법령에 따라 개인정보를 계속 보존하여야 하는
              경우에는, 해당 개인정보(또는 개인정보파일)를 별도의 데이터베이스(DB)로
              옮기거나 보관 장소를 달리하여 보존합니다.
            </li>
            <li>개인정보 파기의 절차 및 방법은 다음과 같습니다.</li>
          </ol>
          <li style={{ marginLeft: '20px' }}>1. 파기절차</li>
          <li style={{ marginLeft: '40px' }}>
            우리학교는 파기사유가 발생한 개인정보(또는 개인정보파일)를 선정하고 파기계획을
            수립하여, 개인정보 보호책임자의 승인을 받아 개인정보(또는 개인정보파일)를
            파기합니다.
          </li>
          <li style={{ marginLeft: '20px' }}>2. 파기방법</li>
          <li style={{ marginLeft: '40px' }}>
            우리학교는 전자적 파일 형태로 기록·저장된 개인정보는 기록을 재생할 수 없도록
            파기하며, 종이 문서에 기록된 개인정보는 분쇄기로 분쇄하거나 소각하여
            파기합니다.
          </li>
        </StyledText>
      </Column>
    </PolicyRoule>
  );
};

export default Chpater08;

const StyledText = styled.div<{ fontType: Font; color: string }>`
  ${({ fontType }) => font[fontType]};
  color: ${(props) => props.color};
`;
