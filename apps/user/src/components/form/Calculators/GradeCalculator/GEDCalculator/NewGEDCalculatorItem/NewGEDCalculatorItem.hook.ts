import { useSetNewGEDSubjectListStore } from '@/stores';
import type { ChangeEventHandler } from 'react';

export const useInput = (subjectIndex: number) => {
  const setNewGEDSubjectList = useSetNewGEDSubjectListStore();
  const handleNewGEDSubjectChange = (subjectName: string) => {
    setNewGEDSubjectList((prev) => {
      const updatedList = [...prev];
      updatedList[subjectIndex] = {
        ...updatedList[subjectIndex],
        subjectName,
      };
      return updatedList;
    });
  };
  const handleScoreChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const inputValue = e.target.value;
    const numericString = inputValue.replace(/\D/g, '');

    if (numericString === '') {
      setNewGEDSubjectList((prev) => {
        const updatedList = [...prev];
        updatedList[subjectIndex] = {
          ...updatedList[subjectIndex],
          score: null,
          achievementLevel21: '-',
          achievementLevel22: '-',
          achievementLevel31: '-',
          achievementLevel32: '-',
        };
        return updatedList;
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

    setNewGEDSubjectList((prev) => {
      const updatedList = [...prev];
      updatedList[subjectIndex] = {
        ...updatedList[subjectIndex],
        score: normalizedScore,
        achievementLevel21: achievementLevel,
        achievementLevel22: achievementLevel,
        achievementLevel31: achievementLevel,
        achievementLevel32: achievementLevel,
      };
      return updatedList;
    });
  };

  return { handleNewGEDSubjectChange, handleScoreChange };
};
export const useDeleteNewGEDSubject = () => {
  const setNewGEDSubjectList = useSetNewGEDSubjectListStore();

  const handleDeleteNewGEDSubject = (targetId: number) => {
    setNewGEDSubjectList((prev) => prev.filter((item) => item.id !== targetId));
  };

  return { handleDeleteNewGEDSubject };
};
