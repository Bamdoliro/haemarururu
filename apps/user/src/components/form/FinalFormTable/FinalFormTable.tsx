import { color } from '@maru/design-system';
import { Switch, Text } from '@maru/ui';
import { flex } from '@maru/utils';
import { SwitchCase } from '@toss/react';
import { Fragment, useState } from 'react';
import styled from 'styled-components';
import CommonTable from './CommonTable/CommonTable';

const additionalMessages = {
  MANIFOLD: [
    '※ 특정 직업 종사자는 원서접수일 현재 1년 이상 해당 직종 재직 중인 자에 한함',
    '※ 제출한 서류만으로 확인 불가 시, 추가 증빙 서류를 요구할 수 있음',
  ],
  OUTSIDE: ['※ 초•중등 교육법 시행령 제82조 제3항 제1호, 2호 해당자'],
};

const FinalFormTable = () => {
  const [final, setFinal] = useState('COMMON');

  return (
    <StyledFinalFormTable>
      <SwitchWrap>
        <Switch
          items={[
            { name: '공통 제출', value: 'COMMON' },
            { name: '기회 균등', value: 'EQUAL' },
            { name: '사회 다양성', value: 'MANIFOLD' },
            { name: '정원 외', value: 'OUTSIDE' },
          ]}
          value={final}
          onChange={(newValue) => setFinal(newValue)}
        />
      </SwitchWrap>
      <Text fontType="p2" color={color.red}>
        ※ 모든 서류는 제출일 기준 최근 14일 이내 발급한 것이어야 합니다.
        {(additionalMessages as Record<string, string[]>)[final]?.map(
          (msg: string, idx: number) => (
            <Fragment key={idx}>
              <br />
              {msg}
            </Fragment>
          )
        )}
      </Text>
      <SwitchCase
        value={final}
        caseBy={{
          COMMON: <CommonTable />,
          EQUAL: <></>,
          MANIFOLD: <></>,
          OUTSIDE: <></>,
        }}
        defaultComponent={<></>}
      />
    </StyledFinalFormTable>
  );
};

export default FinalFormTable;

const StyledFinalFormTable = styled.table`
  ${flex({ alignItems: 'flex-start', flexDirection: 'column' })}
  width: 817px;
  gap: 20px;
`;

const SwitchWrap = styled.div`
  width: 440px;
`;
