import { PolicyRoule } from '@/components/policy';
import { color, font } from '@maru/design-system';
import { Column } from '@maru/ui';
import Image from 'next/image';
import { styled } from 'styled-components';

type Font = keyof typeof font;

const Chpater06 = () => {
  return (
    <Column gap={16} alignItems="flex-start">
      <PolicyRoule title="제6조 정보주체와 법정대리인의 권리․의무 및 그 행사 방법">
        <StyledText fontType="p3" color={color.gray900}>
          <ol style={{ marginLeft: '20px' }}>
            <li>
              정보주체는 우리학교에 대해 언제든지 개인정보 열람·정정·삭제·처리정지 및 철회
              요구, 자동화된 결정에 대한 거부 또는 설명 요구 등의 권리를 행사할 수
              있습니다.
            </li>
            <li>
              만 14세 미만 아동에 관한 개인정보의 열람등 요구는 법정대리인이 직접 해야
              하며, 만 14세 이상의 미성년자인 정보주체는 정보주체의 개인정보에 관하여
              미성년자 본인이 권리를 행사하거나 법정대리인을 통하여 권리를 행사할 수도
              있습니다.
            </li>
            <li>
              권리 행사는 우리학교에 대해 ｢개인정보 보호법 시행령｣ 제41조 제1항에 따라
              서면, 전자우편, 모사전송(FAX) 등을 통하여 하실 수 있으며, 우리학교는 이에
              대해 지체 없이 조치하겠습니다.
            </li>
            <li>
              권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을 통하여 하실
              수도 있습니다. 이 경우 “개인정보 처리 방법에 관한 고시(제2020-7호)” 별지
              제11호 서식에 따른 위임장을 제출하셔야 합니다.
            </li>
            <li>
              개인정보 열람 및 처리 정지를 요구할 권리는 ｢개인정보 보호법｣ 제35조 제4항 및
              제37조 제2항에 의하여 제한 될 수 있습니다.
            </li>
            <li>
              다른 법령에서 그 개인정보가 수집 대상으로 명시되어 있는 경우에는 해당
              개인정보의 삭제를 요구할 수 없습니다.
            </li>
            <li>
              자동화된 결정이 이루어진다는 사실에 대해 정보주체의 동의를 받았거나, 계약
              등을 통해 미리 알린 경우, 법률에 명확히 규정이 있는 경우에는 자동화된 결정에
              대한 거부는 인정되지 않으며 설명 및 검토 요구만 가능합니다. 또한 자동화된
              결정에 대한 거부·설명 요구는 다른 사람의 생명·신체·재산과 그 밖의 이익을
              부당하게 침해할 우려가 있는 등 정당한 사유가 있는 경우에는 그 요구가 거절될
              수 있습니다.
            </li>
            <li>
              우리학교는 정보주체 권리에 따른 열람의 요구, 정정·삭제의 요구, 처리정지의
              요구, 자동화된 결정 거부·설명 요구 시 열람 등 요구를 한 자가 본인이거나
              정당한 대리인인지를 확인합니다.
            </li>
          </ol>
        </StyledText>
      </PolicyRoule>
      <Image src="/images/privacy.png" width={680} height={591} alt="privacy" />
    </Column>
  );
};

export default Chpater06;

const StyledText = styled.div<{ fontType: Font; color: string }>`
  ${({ fontType }) => font[fontType]};
  color: ${(props) => props.color};
`;
