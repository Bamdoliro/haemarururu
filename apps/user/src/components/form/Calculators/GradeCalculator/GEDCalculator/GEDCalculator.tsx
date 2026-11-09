import styled from '@emotion/styled';
import GEDCalculatorHeader from './GEDCalculatorHeader/GEDCalculatorHeader';
import { useEffect } from 'react';
import { GEDSubjectListAtom, newGEDSubjectListAtom, formAtom } from '@/stores';
import GEDCalculatorItem from './GEDCalculatorItem/GEDCalculatorItem';
import { useAtomValue, useSetAtom } from 'jotai';

interface GEDCalculatorProps {
  subjectError?: boolean[];
}

const GEDCalculator = ({ subjectError }: GEDCalculatorProps) => {
  const newGEDSubjectList = useAtomValue(newGEDSubjectListAtom);
  const GEDSubjectList = useAtomValue(GEDSubjectListAtom);
  const setForm = useSetAtom(formAtom);

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
