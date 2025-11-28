import { color } from '@maru/design-system';
import { Column, Text, Textarea } from '@maru/ui';
import FormController from '../../FormController/FormController';
import { useFormValueStore } from '@/stores';
import { useIntoductionForm } from './IntroductionContent.hook';

const IntroductionContent = () => {
  const { onFieldChange, handleNextStep, handlePreviousStep, errors } =
    useIntoductionForm();
  const form = useFormValueStore();

  return (
    <>
      <Column gap={100}>
        <Column gap={24}>
          <Text fontType="H4">&lt;자기소개서 작성 시 유의사항&gt;</Text>
          <Text fontType="p3">
            1. 자기소개서는 평가를 위한 중요한 자료이므로 반드시 본인이 작성하여야 하며,
            <br />
            사실에 입각하여 정직하게 자기주도학습과정, 건학이념과 연계한 지원동기, 꿈과
            끼를 살리기 위한 활동계획 및 진로계획 <br />
            그리고 생활기록부에 기록된 인성영역 활동 실적과 이를 통해 배우고 느낀 점 등을
            기술하십시오.
          </Text>
          <Text fontType="p3" color={color.red}>
            ※ 자기소개서의 대리작성, 허위작성 혹은 표절 시에는 사후에도 입학 취소 등
            불이익 부과
          </Text>
          <Text fontType="p3">
            2. 본문에는 자신의 경험이나 사례 등을 들어 구체적으로 작성하되,
            <br /> 영어 등 각종 인증시험 점수, 교과목의 점수·석차, 교내‧외 각종 대회
            입상실적, 자격증, 영재교육원 교육 및 수료 여부(우회적‧간접적 기재 포함) 등은
            기재 시 0점 처리되며,
            <br /> 부모의 사회·경제적 지위 암시 내용, 지원자 본인의 인적사항을 암시하는
            내용 등은 기재 시 항목 배점의 10%이상 감점 처리되니 기재하지 마십시오.
            <br />
            3. 반드시 본 서식을 사용하여 작성하고, 띄어쓰기를 제외한 영역별 제한된 글자수
            이내로 제시된 형식에 따라 작성하십시오.
            <br />
            4. 자기소개서를 입학원서와 함께 본교에 일괄 제출하십시오.
            <br />
            5. 표지와 본문이 분리되지 않도록 좌측 상단을 클립으로 묶어 주십시오.
            <br />
            6. 자기소개서는 입학전형 및 입학 후 학생 지도 자료로 활용되며, 비공개 문서로
            관리될 것입니다.
          </Text>
          <Text fontType="p3" color={color.red}>
            *자기소개서는 자동저장됩니다.
          </Text>
        </Column>
        <Column gap={64}>
          <Textarea
            name="learningExperience"
            label="1. 중학교 재학 중 자기주도적으로 수행한 활동 중 가장 큰 성취감을 느꼈던 학습 경험에 대하여 기술하십시오."
            placeholder="띄어쓰기 제외 700자 이내로 작성하십시오."
            limit={700}
            value={form.document.learningExperience}
            onChange={onFieldChange}
            isError={!!errors.learningExperience?.length}
            errorMessage={errors.learningExperience ? errors.learningExperience[0] : ''}
            excludeSpace
            manualLimit
          />
          <Textarea
            name="statementOfPurpose"
            limit={300}
            label={
              <Column gap={8}>
                <Text fontType="context" color={color.gray900}>
                  2. 본교 건학이념과 연계해 본교에 관심을 갖게 된 동기와 고등학교 입학 후
                  본인의 꿈과 끼를 살리기 위한 활동계획, 그리고 고등학교
                  <br />
                  졸업 후 진로계획에 관하여 구체적으로 기술하십시오.
                </Text>
                <Text fontType="p3" color={color.haeMaruDefault}>
                  * 해운대고등학교 건학이념 : 국가와 인류사회의 번영에 공헌하는 창의융합형
                  글로벌 리더 육성
                </Text>
              </Column>
            }
            placeholder="띄어쓰기 제외 300자 이내로 작성하십시오."
            value={form.document.statementOfPurpose}
            onChange={onFieldChange}
            isError={!!errors.statementOfPurpose?.length}
            errorMessage={errors.statementOfPurpose ? errors.statementOfPurpose[0] : ''}
            excludeSpace
            manualLimit
          />
          <Textarea
            name="personality"
            limit={500}
            label={
              <Column gap={8}>
                <Text fontType="context" color={color.gray900}>
                  3. 본인의 인성(배려, 나눔, 협력, 타인 존중, 규칙준수 등)을 나타낼 수
                  있는 개인적 경험 및 이를 통해 배우고 느낀 점을 구체적으로
                  <br />
                  기술하십시오.
                </Text>
                <Text fontType="p3" color={color.haeMaruDefault}>
                  (반드시 생활기록부에 기재된 활동 중에 선택하여 자세히 서술하십시오.)
                </Text>
              </Column>
            }
            placeholder="띄어쓰기 제외 500자 이내로 작성하십시오."
            value={form.document.personality}
            onChange={onFieldChange}
            isError={!!errors.personality?.length}
            errorMessage={errors.personality ? errors.personality[0] : ''}
            excludeSpace
            manualLimit
          />
        </Column>
      </Column>
      <FormController
        onNext={handleNextStep}
        onPrevious={handlePreviousStep}
        step="자기소개서"
      />
    </>
  );
};

export default IntroductionContent;
