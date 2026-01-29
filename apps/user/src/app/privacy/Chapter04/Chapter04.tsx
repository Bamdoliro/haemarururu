import { PolicyRoule } from '@/components/policy';
import { color, font } from '@maru/design-system';
import { Column } from '@maru/ui';
import styled from '@emotion/styled';

type Font = keyof typeof font;

const Chpater04 = () => {
  return (
    <Column gap={32} alignItems="flex-start">
      <PolicyRoule title="제4조 개인정보의 제3자 제공">
        <StyledText fontType="p3" color={color.gray900}>
          <ol style={{ marginLeft: '20px' }}>
            <li>
              우리학교는 원칙적으로 정보주체의 개인정보를 수집·이용 목적으로 명시한 범위
              내에서 처리하며, 정보주체의 동의, 법률의 특별한 규정 등 「개인정보 보호법」
              제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.
            </li>
            <li>
              (게시판 형식으로 공개하는 경우)
              <br />▶ 개인정보 제3자 제공현황 열람 :{' '}
              <span style={{ color: `${color.haeMaruDefault}` }}>
                개인정보 제3자 제공 게시판 보기
              </span>
            </li>
          </ol>
        </StyledText>
      </PolicyRoule>
      <PolicyRoule title="제4조의2 개인정보의 추가적인 이용·제공 기준">
        <StyledText fontType="p3" color={color.gray900}>
          우리학교는 개인정보 보호법 제15조제3항 또는 제17조제4항에 따라 정보주체의 동의
          없이 개인정보를 이용 또는 제공하려는 경우는 다음의 경우를 고려하겠습니다.
          <li style={{ marginLeft: '10px' }}>1. 당초 수집 목적과 관련성이 있는지 여부</li>
          <li style={{ marginLeft: '10px' }}>
            2. 개인정보를 수집한 정황 또는 처리 관행에 비추어 볼 때 개인정보의 추가적인
            이용 또는 제공에 대한 예측 가능성이 있는지 여부
          </li>
          <li style={{ marginLeft: '10px' }}>
            3. 정보주체의 이익을 부당하게 침해하는지 여부
          </li>
          <li style={{ marginLeft: '10px' }}>
            4. 가명처리 또는 암호화 등 안전성 확보에 필요한 조치를 하였는지 여부
          </li>
        </StyledText>
      </PolicyRoule>
      <PolicyRoule title="제4조의3 가명정보 처리에 관한 사항">
        <StyledText fontType="p3" color={color.gray900}>
          <ol style={{ marginLeft: '10px' }}>
            <li>
              우리학교는 수집한 개인정보를 특정 개인이 알아볼 수 없도록 가명 처리하여
              통계작성, 과학적 연구, 공익적 기록보존 등을 위하여 처리할 수 있습니다.
            </li>
            <li>
              가명정보는 재식별되지 않도록 분리하여 별도 저장·관리하고 가명정보의 처리
              내용에 대해 기록을 작성하여 보관하는 등 필요한 기술적·관리적 보호조치를
              취하고 있습니다.
            </li>
            <li>
              우리학교는 가명정보를 처리하지 않고 있습니다. 가명정보 처리 시 교육부
              개인정보 보호지침 제78조의2에 따라 “교육분야 가명정보 처리 가이드라인”에서
              제시하는 기준에 준하여 처리하고 처리된 내용은 개인정보 처리방침에
              공개하겠습니다.
            </li>
          </ol>
        </StyledText>
      </PolicyRoule>
    </Column>
  );
};

export default Chpater04;

const StyledText = styled.div<{ fontType: Font; color: string }>`
  ${({ fontType }) => font[fontType]};
  color: ${(props) => props.color};
`;
