import { flex } from '@maru/utils';
import styled from 'styled-components';
import { Column, Radio, Row, Td } from '@maru/ui';
import TypeHeader from './TypeHeader/TypeHeader';
import FormController from '../../FormController/FormController';
import { useCTAButton, useRadio } from './TypeContent.hook';
import { useFormStore } from '@/stores';
import { useEffect } from 'react';

const TypeContent = () => {
  const [form, setForm] = useFormStore();
  const { handleNextStep, handlePreviousStep } = useCTAButton();
  const { handleFormTypeChange } = useRadio();

  useEffect(() => {
    if (form.education.graduationType === 'QUALIFICATION_EXAMINATION') {
      if (!(form.type === 'REGULAR')) {
        alert(
          '서류상으로 검정고시 합격자는 특별전형 지원이 불가능해요. 일반전형으로 지원해주세요!'
        );
        setForm((prev) => ({ ...prev, type: 'REGULAR' }));
      }
    }
  }, [form.education.graduationType, form.type, setForm]);

  return (
    <StyledTypeContent>
      <TypeHeader />
      <Row>
        <Td width="30%" height={56} isBottom={true} isLeft={true}>
          일반 전형
        </Td>
        <Td width="30%" height={56} isBottom={true}>
          일반 전형
        </Td>
        <Td width="30%" height={56} isBottom={true}>
          {null}
        </Td>
        <Td width="10%" height={56} isBottom={true} isRight={true}>
          <Radio
            name="type"
            value="REGULAR"
            onChange={handleFormTypeChange}
            checked={form.type === 'REGULAR'}
          />
        </Td>
      </Row>
      <Row>
        <Td width="30%" height={1288} isBottom={true} isLeft={true}>
          특별 전형
        </Td>
        <Column width="30%">
          <Td width="100%" height={392} isBottom={true}>
            기회균등 전형
          </Td>
          <Td width="100%" height={896} isBottom={true}>
            사회다양성 전형
          </Td>
        </Column>
        <Column width="30%">
          <Td width="100%" height={56} isBottom={true}>
            국가보훈대상자
          </Td>
          <Td width="100%" height={56}>
            국민기초생활수급자
          </Td>
          <Td width="100%" height={56}>
            한부모가족 보호대상자
          </Td>
          <Td width="100%" height={56}>
            차상위계층
          </Td>
          <Td width="100%" height={56}>
            차차상위계층
          </Td>
          <Td width="100%" height={56} isBottom={true}>
            학교장 추천
          </Td>
          <Td width="100%" height={56}>
            교육감 추천
          </Td>
          <Td width="100%" height={56}>
            다문화가족자녀
          </Td>
          <Td width="100%" height={56}>
            북한이탈청소년
          </Td>
          <Td width="100%" height={56} isBottom={true}>
            특수교육대상자
          </Td>
          <Td width="100%" height={56} isBottom={true}>
            아동복지시설 보호학생
          </Td>
          <Td width="100%" height={56} isBottom={true}>
            소년•소녀 가장
          </Td>
          <Td width="100%" height={56} isBottom={true}>
            조손 가정 자녀
          </Td>
          <Td width="100%" height={56} isBottom={true}>
            장애인의 자녀
          </Td>
          <Td width="100%" height={56} isBottom={true}>
            순직 군경•소방관 등 자녀
          </Td>
          <Td width="100%" height={56} isBottom={true}>
            다자녀가정 자녀
          </Td>
          <Td width="100%" height={56} isBottom={true}>
            한부모가족 자녀(비법정)
          </Td>
          <Td width="100%" height={56} isBottom={true}>
            복지시설 운영자•종사자 자녀
          </Td>
          <Td width="100%" height={56} isBottom={true}>
            경찰•군인•소방공무원 자녀
          </Td>
          <Td width="100%" height={56} isBottom={true}>
            환경미화원 자녀
          </Td>
          <Td width="100%" height={56} isBottom={true}>
            해외파병군인 자녀
          </Td>
          <Td width="100%" height={56} isBottom={true}>
            무형문화재 보유자 자녀
          </Td>
          <Td width="100%" height={56} isBottom={true}>
            선원 자녀
          </Td>
        </Column>
        <Column width="10%">
          <Td width="100%" height={56} isBottom={true} isRight={true}>
            <Radio
              name="type"
              value="NATIONAL_VETERANS"
              onChange={handleFormTypeChange}
              checked={form.type === 'NATIONAL_VETERANS'}
            />
          </Td>
          <Td width="100%" height={56} isRight={true}>
            <Radio
              name="type"
              value="NATIONAL_BASIC_LIVING"
              onChange={handleFormTypeChange}
              checked={form.type === 'NATIONAL_BASIC_LIVING'}
            />
          </Td>
          <Td width="100%" height={56} isRight={true}>
            <Radio
              name="type"
              value="ONE_PARENT"
              onChange={handleFormTypeChange}
              checked={form.type === 'ONE_PARENT'}
            />
          </Td>
          <Td width="100%" height={56} isRight={true}>
            <Radio
              name="type"
              value="NEAR_POVERTY"
              onChange={handleFormTypeChange}
              checked={form.type === 'NEAR_POVERTY'}
            />
          </Td>
          <Td width="100%" height={56} isRight={true}>
            <Radio
              name="type"
              value="LOWER_MIDDLE"
              onChange={handleFormTypeChange}
              checked={form.type === 'LOWER_MIDDLE'}
            />
          </Td>
          <Td width="100%" height={56} isBottom={true} isRight={true}>
            <Radio
              name="type"
              value="PRINCIPAL_RECOMMENDATION"
              onChange={handleFormTypeChange}
              checked={form.type === 'PRINCIPAL_RECOMMENDATION'}
            />
          </Td>
          <Td width="100%" height={56} isRight={true}>
            <Radio
              name="type"
              value="SUPERINTENDENT_RECOMMENDATION"
              onChange={handleFormTypeChange}
              checked={form.type === 'SUPERINTENDENT_RECOMMENDATION'}
            />
          </Td>
          <Td width="100%" height={56} isRight={true}>
            <Radio
              name="type"
              value="MULTICULTURAL"
              onChange={handleFormTypeChange}
              checked={form.type === 'MULTICULTURAL'}
            />
          </Td>
          <Td width="100%" height={56} isRight={true}>
            <Radio
              name="type"
              value="FROM_NORTH_KOREA"
              onChange={handleFormTypeChange}
              checked={form.type === 'FROM_NORTH_KOREA'}
            />
          </Td>
          <Td width="100%" height={56} isBottom={true} isRight={true}>
            <Radio
              name="type"
              value="SPECIAL_EDUCATION_STUDENT"
              onChange={handleFormTypeChange}
              checked={form.type === 'SPECIAL_EDUCATION_STUDENT'}
            />
          </Td>
          <Td width="100%" height={56} isBottom={true} isRight={true}>
            <Radio
              name="type"
              value="CHILD_WELFARE_FACILITY"
              onChange={handleFormTypeChange}
              checked={form.type === 'CHILD_WELFARE_FACILITY'}
            />
          </Td>
          <Td width="100%" height={56} isBottom={true} isRight={true}>
            <Radio
              name="type"
              value="TEEN_HOUSEHOLDER"
              onChange={handleFormTypeChange}
              checked={form.type === 'TEEN_HOUSEHOLDER'}
            />
          </Td>
          <Td width="100%" height={56} isBottom={true} isRight={true}>
            <Radio
              name="type"
              value="GRANDFAMILY"
              onChange={handleFormTypeChange}
              checked={form.type === 'GRANDFAMILY'}
            />
          </Td>
          <Td width="100%" height={56} isBottom={true} isRight={true}>
            <Radio
              name="type"
              value="DISABLED_PARENT"
              onChange={handleFormTypeChange}
              checked={form.type === 'DISABLED_PARENT'}
            />
          </Td>
          <Td width="100%" height={56} isBottom={true} isRight={true}>
            <Radio
              name="type"
              value="FALLEN_HERO"
              onChange={handleFormTypeChange}
              checked={form.type === 'FALLEN_HERO'}
            />
          </Td>
          <Td width="100%" height={56} isBottom={true} isRight={true}>
            <Radio
              name="type"
              value="MULTI_CHILDREN"
              onChange={handleFormTypeChange}
              checked={form.type === 'MULTI_CHILDREN'}
            />
          </Td>
          <Td width="100%" height={56} isBottom={true} isRight={true}>
            <Radio
              name="type"
              value="NON_STATUTORY_ONE_PARENT"
              onChange={handleFormTypeChange}
              checked={form.type === 'NON_STATUTORY_ONE_PARENT'}
            />
          </Td>
          <Td width="100%" height={56} isBottom={true} isRight={true}>
            <Radio
              name="type"
              value="WELFARE_FACILITY_WORKER"
              onChange={handleFormTypeChange}
              checked={form.type === 'WELFARE_FACILITY_WORKER'}
            />
          </Td>
          <Td width="100%" height={56} isBottom={true} isRight={true}>
            <Radio
              name="type"
              value="PUBLIC_SERVANT"
              onChange={handleFormTypeChange}
              checked={form.type === 'PUBLIC_SERVANT'}
            />
          </Td>
          <Td width="100%" height={56} isBottom={true} isRight={true}>
            <Radio
              name="type"
              value="STREET_CLEANER"
              onChange={handleFormTypeChange}
              checked={form.type === 'STREET_CLEANER'}
            />
          </Td>
          <Td width="100%" height={56} isBottom={true} isRight={true}>
            <Radio
              name="type"
              value="DEPLOYED_SOLDIER"
              onChange={handleFormTypeChange}
              checked={form.type === 'DEPLOYED_SOLDIER'}
            />
          </Td>
          <Td width="100%" height={56} isBottom={true} isRight={true}>
            <Radio
              name="type"
              value="INTANGIBLE_CULTURAL_HERITAGE"
              onChange={handleFormTypeChange}
              checked={form.type === 'INTANGIBLE_CULTURAL_HERITAGE'}
            />
          </Td>
          <Td width="100%" height={56} isBottom={true} isRight={true}>
            <Radio
              name="type"
              value="SAILOR"
              onChange={handleFormTypeChange}
              checked={form.type === 'SAILOR'}
            />
          </Td>
        </Column>
      </Row>
      <Row>
        <Td
          width="calc(736px/3)"
          height={112}
          borderBottomLeftRadius={12}
          isBottomBold={true}
          isLeft={true}
        >
          전형 외 전형
        </Td>
        <Column width="30%">
          <Td width="100%" height={56}>
            특례입학 대상자
          </Td>
          <Td width="100%" height={56} isBottomBold={true}>
            국가보훈대상자 중 교육지원대상자
          </Td>
        </Column>
        <Column width="30%">
          <Td width="100%" height={56}>
            특례입학 대상자
          </Td>
          <Td width="100%" height={56} isBottomBold={true}>
            국가보훈대상자 중 교육지원대상자
          </Td>
        </Column>
        <Column width="10%">
          <Td width="100%" height={56} isRight={true}>
            <Radio
              name="type"
              value="SPECIAL_ADMISSION"
              onChange={handleFormTypeChange}
              checked={form.type === 'SPECIAL_ADMISSION'}
            />
          </Td>
          <Td
            width="100%"
            height={56}
            isBottomBold={true}
            isRight={true}
            borderBottomRightRadius={12}
          >
            <Radio
              name="type"
              value="NATIONAL_VETERANS_EDUCATION"
              onChange={handleFormTypeChange}
              checked={form.type === 'NATIONAL_VETERANS_EDUCATION'}
            />
          </Td>
        </Column>
      </Row>
      <FormController
        onNext={handleNextStep}
        onPrevious={handlePreviousStep}
        step="전형선택"
      />
    </StyledTypeContent>
  );
};

export default TypeContent;

const StyledTypeContent = styled.div`
  ${flex({ flexDirection: 'column' })}
  width: 100%;
`;
