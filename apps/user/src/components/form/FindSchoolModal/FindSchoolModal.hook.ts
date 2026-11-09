import { formAtom } from '@/stores';
import type { School } from '@/types/form/client';
import { useState } from 'react';
import { useSetAtom } from 'jotai';

export const useFindSchoolModal = (onClose: () => void) => {
  const setForm = useSetAtom(formAtom);
  const [school, setSchool] = useState<School>({
    name: '',
    location: '',
    address: '',
    code: '',
  });

  const handleOnClose = () => {
    setSchool({ name: '', location: '', address: '', code: '' });
    onClose();
  };

  const handleOnConfirm = () => {
    const { name, location, address, code } = school;

    setForm((prev) => ({
      ...prev,
      education: {
        ...prev.education,
        schoolName: name,
        schoolLocation: location,
        schoolAddress: address,
        schoolCode: code,
      },
    }));
    onClose();
  };

  return { handleOnClose, handleOnConfirm, school, setSchool };
};
