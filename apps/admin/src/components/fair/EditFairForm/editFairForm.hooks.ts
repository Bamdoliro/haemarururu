import { useDeleteFairMutation, usePutFairMutation } from '@/services/fair/mutations';
import { useFairDetailQuery } from '@/services/fair/queries';
import type { Fair, FairFormInput } from '@/types/fair/client';
import { useEffect, useState } from 'react';

export const useEditFairForm = (fairId: number) => {
  const [editFair, setEditFair] = useState<Fair>({
    start: '',
    capacity: 0,
    place: '',
    type: 'STUDENT_AND_PARENT',
    applicationStartDate: null,
    applicationEndDate: null,
  });

  const { deleteFairMutate } = useDeleteFairMutation(fairId);
  const { putFairMutate } = usePutFairMutation(fairId);
  const { data: fairData } = useFairDetailQuery(fairId);

  useEffect(() => {
    if (fairData) {
      setEditFair({
        start: fairData.start,
        capacity: fairData.capacity,
        place: fairData.place,
        type: fairData.type,
        applicationStartDate: fairData.applicationStartDate,
        applicationEndDate: fairData.applicationEndDate,
      });
    }
  }, [fairData]);

  const handleDeleteFair = () => {
    deleteFairMutate();
  };

  const handleEditFair = () => {
    putFairMutate(editFair);
  };

  const handleChange = <K extends keyof FairFormInput>(
    key: K,
    value: FairFormInput[K]
  ) => {
    setEditFair((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'capacity') {
      const numericValue = value.replace(/\D/g, '');
      handleChange(
        name as keyof FairFormInput,
        numericValue as FairFormInput[keyof FairFormInput]
      );
      return;
    }

    handleChange(name as keyof FairFormInput, value);
  };

  const handleDateChange = (value: string) => {
    const raw = value.replace(/\D/g, '').slice(0, 8);
    setEditFair((prev) => ({
      ...prev,
      start: raw + prev.start.slice(8),
    }));
  };

  const handleTimeChange = (value: string) => {
    const raw = value.replace(/\D/g, '').slice(0, 4);
    setEditFair((prev) => ({
      ...prev,
      start: prev.start.slice(0, 8) + raw,
    }));
  };

  return {
    handleDeleteFair,
    handleEditFair,
    handleInputChange,
    handleDateChange,
    handleTimeChange,
    handleChange,
    editFair,
  };
};
