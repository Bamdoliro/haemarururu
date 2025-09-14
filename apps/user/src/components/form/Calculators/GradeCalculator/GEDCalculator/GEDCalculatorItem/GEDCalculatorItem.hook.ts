import { useSetGEDSubjectListStore } from '@/stores';
import type { ChangeEventHandler } from 'react';

export const useInput = (subjectIndex: number) => {
  const setGEDSubjectList = useSetGEDSubjectListStore();

  const handleGEDSubjectChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const inputValue = e.target.value;
    const numericString = inputValue.replace(/\D/g, '');

    if (numericString === '') {
      setGEDSubjectList((prev) => {
        const updatedData = [...prev];
        updatedData[subjectIndex] = {
          ...updatedData[subjectIndex],
          score: null,
          achievementLevel21: '-',
          achievementLevel22: '-',
          achievementLevel31: '-',
          achievementLevel32: '-',
        };
        return updatedData;
      });
      return;
    }

    const normalizedString = numericString.replace(/^0+/, '') || '0';
    let normalizedScore = Number(normalizedString);
    if (normalizedScore > 100) normalizedScore = 100;

    const achievementLevel =
      normalizedScore >= 99
        ? 'A'
        : normalizedScore >= 97
        ? 'B'
        : normalizedScore >= 93
        ? 'C'
        : normalizedScore >= 89
        ? 'D'
        : 'E';

    setGEDSubjectList((prev) => {
      const updatedData = [...prev];
      updatedData[subjectIndex] = {
        ...updatedData[subjectIndex],
        score: normalizedScore,
        achievementLevel21: achievementLevel,
        achievementLevel22: achievementLevel,
        achievementLevel31: achievementLevel,
        achievementLevel32: achievementLevel,
      };
      return updatedData;
    });
  };

  return { handleGEDSubjectChange };
};
