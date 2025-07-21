import { PolicyRoule } from '@/components/policy';
import { color, font } from '@maru/design-system';
import { styled } from 'styled-components';

type Font = keyof typeof font;

const Chpater05 = () => {
  return (
    <PolicyRoule title="제5조 개인정보 처리 위탁">
      <StyledText fontType="p3" color={color.gray900}>
        <ol style={{ marginLeft: '20px' }}>
          <li>
            우리학교는 위탁계약 체결 시 「개인정보 보호법」 제26조에 따라 위탁업무
            수행목적 외 개인정보 처리금지, 기술적·관리적 보호조치, 재위탁 제한, 수탁자에
            대한 관리·감독, 손해배상 등 책임에 관한 사항을 계약서 등 문서에 명시하고,
            수탁자가 개인정보를 안전하게 처리하는지를 감독하고 있습니다.
          </li>
          <li>
            우리학교에서 원활한 개인정보 업무처리를 위하여 개인정보 처리업무를 위탁하고
            있는 현황은 다음과 같습니다.
            <br />▶ 개인정보 위탁 현황 열람 :{' '}
            <span style={{ color: `${color.haeMaruDefault}` }}>
              개인정보처리 위탁 게시판 보기
            </span>
          </li>
        </ol>
      </StyledText>
    </PolicyRoule>
  );
};

export default Chpater05;

const StyledText = styled.div<{ fontType: Font; color: string }>`
  ${({ fontType }) => font[fontType]};
  color: ${(props) => props.color};
`;
