import styled from '@emotion/styled';
import GEDCalculatorHeader from './GEDCalculatorHeader/GEDCalculatorHeader';
import { useEffect } from 'react';
import {
  useGEDSubjectListValueStore,
  useNewGEDSubjectListValueStore,
  useSetFormStore,
} from '@/stores';
import GEDCalculatorItem from './GEDCalculatorItem/GEDCalculatorItem';

interface GEDCalculatorProps {
  subjectError?: boolean[];
}

const GEDCalculator = ({ subjectError }: GEDCalculatorProps) => {
  const newGEDSubjectList = useNewGEDSubjectListValueStore();
  const GEDSubjectList = useGEDSubjectListValueStore();
  const setForm = useSetFormStore();

  useEffect(() => {
    const studentSubjectList = [...GEDSubjectList, ...newGEDSubjectList].map(
      ({ ...rest }) => rest
    );
    setForm((prev) => ({
      ...prev,
      grade: { ...prev.grade, subjectList: studentSubjectList },
    }));
  }, [GEDSubjectList, newGEDSubjectList, setForm]);

  return (
    <StyledGEDCalculator>
      <GEDCalculatorHeader />
      {GEDSubjectList.map(({ id, subjectName, score }, index) => {
        const isLast = index === GEDSubjectList.length - 1;

        return (
          <GEDCalculatorItem
            id={id}
            subject={subjectName}
            score={score}
            isError={subjectError}
            isLast={isLast}
          />
        );
      })}
    </StyledGEDCalculator>
  );
};

export default GEDCalculator;

const StyledGEDCalculator = styled.div`
  width: 100%;
  height: 100%;
`;
