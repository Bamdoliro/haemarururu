import { flex } from '@maru/utils';
import { styled } from 'styled-components';
import BasicCalculatorHeader from './BasicCalculatorHeader/BasicCalculatorHeader';
import BasicCalculatorItem from './BasicCalculatorItem/BasicCalculatorItem';
import { useSetFormStore, useSubjectListValueStore } from '@/stores';
import { useEffect } from 'react';

interface BasicCalculatorProps {
  subjectError?: boolean[];
}

const BasicCalculator = ({ subjectError }: BasicCalculatorProps) => {
  const subjectList = useSubjectListValueStore();
  const setForm = useSetFormStore();

  useEffect(() => {
    const studentSubjectList = [...subjectList].map(({ ...rest }) => rest);

    setForm((prev) => ({
      ...prev,
      grade: { ...prev.grade, subjectList: studentSubjectList },
    }));
  }, [setForm, subjectList]);

  return (
    <StyledBasicCalculator>
      <BasicCalculatorHeader />
      {subjectList.map(({ id }, index) => {
        const isLast = index === subjectList.length - 1;

        return (
          <BasicCalculatorItem
            id={id}
            key={`subject ${id}`}
            achievementLevels={['미이수', 'A', 'B', 'C', 'D', 'E']}
            isError={subjectError}
            isLast={isLast}
          />
        );
      })}
    </StyledBasicCalculator>
  );
};

export default BasicCalculator;

const StyledBasicCalculator = styled.div`
  ${flex({ flexDirection: 'column' })};
  width: 100%;
  height: 100%;
`;
