import { formAtom } from '@/stores';
import type { AttendanceName } from '@/types/form/client';
import type { ChangeEventHandler } from 'react';
import { useSetAtom } from 'jotai';

export const useInput = () => {
  const setForm = useSetAtom(formAtom);

  const handleAttendanceInfoChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    const { attendanceName, countName } = JSON.parse(name);

    setForm((prev) => ({
      ...prev,
      grade: {
        ...prev.grade,
        [attendanceName]: {
          ...prev.grade[attendanceName as AttendanceName],
          [countName]: Number(value),
        },
      },
    }));
  };

  return { handleAttendanceInfoChange };
};
