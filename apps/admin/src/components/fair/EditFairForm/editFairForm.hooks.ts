import { formatFairRequestBody } from '@/components/fair/FairForm/fair.hooks';
import { useDeleteFairMutation, usePutFairMutation } from '@/services/fair/mutations';
import { useFairDetailQuery } from '@/services/fair/queries';
import type { FairFormInput } from '@/types/fair/client';
import { useEffect, useState } from 'react';

// 서버 응답의 ISO 형식("2026-09-05T11:00:00")을 폼에서 쓰는 12자리("202609051100")로 변환
const toRawDateTime = (isoDateTime: string) =>
  isoDateTime.replace(/\D/g, '').slice(0, 12);

export const useEditFairForm = (fairId: number) => {
  const [editFair, setEditFair] = useState<FairFormInput>({
    start: '',
    capacity: '',
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
        start: toRawDateTime(fairData.start),
        capacity: String(fairData.capacity),
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
    putFairMutate(formatFairRequestBody(editFair));
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
