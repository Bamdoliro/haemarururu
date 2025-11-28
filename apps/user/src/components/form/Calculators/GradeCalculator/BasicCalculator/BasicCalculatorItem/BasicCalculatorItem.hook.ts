import { useSetSubjectListStore } from '@/stores';

export const useInput = (id: number) => {
  const setSubjectList = useSetSubjectListStore();

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
