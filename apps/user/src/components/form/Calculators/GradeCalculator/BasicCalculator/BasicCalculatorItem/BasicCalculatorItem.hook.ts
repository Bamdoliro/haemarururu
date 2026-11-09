import { subjectListAtom } from '@/stores';
import { useSetAtom } from 'jotai';

export const useInput = (id: number) => {
  const setSubjectList = useSetAtom(subjectListAtom);

  const handleSubjectChange = (data: string, name: string) => {
    const value = data;
    setSubjectList((prev) => {
      const updatedData = [...prev];
      const subject = updatedData[id];

      updatedData[id] = {
        ...subject,
        [name]: value,
      };
      return updatedData;
    });
  };

  return { handleSubjectChange };
};
