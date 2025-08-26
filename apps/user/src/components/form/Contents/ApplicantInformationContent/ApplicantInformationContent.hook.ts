import { useUser } from '@/hooks';
import { ApplicantSchema } from '@/schemas/ApplicantSchema';
import { useSaveFormQuery } from '@/services/form/queries';
import { useFormValueStore, useSetFormStore } from '@/stores';
import { useFormStep, formatBirthday } from '@/utils';
import { useEffect, useState } from 'react';
import type { ChangeEvent } from 'react';
import { z } from 'zod';

export const useApplicantForm = () => {
  const form = useFormValueStore();
  const setForm = useSetFormStore();
  const { userData } = useUser();
  const { data: saveFormQuery } = useSaveFormQuery();
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const { run: FormStep } = useFormStep();
  const formatter: Record<string, (value: string) => string> = {
    registrationNumber: (value) => {
      const num = value.replace(/\D/g, '').slice(0, 13);
      return num.length > 6 ? `${num.slice(0, 6)}-${num.slice(6)}` : num;
    },
    phoneNumber: (value) => value.replace(/\D/g, ''),
  };

  useEffect(() => {
    const birthday = formatBirthday(saveFormQuery?.applicant?.registrationNumber ?? '');

    setForm((prev) => ({
      ...prev,
      applicant: {
        ...prev.applicant,
        name: saveFormQuery?.applicant.name ?? userData.name,
        phoneNumber: saveFormQuery?.applicant.phoneNumber ?? userData.phoneNumber,
        gender: 'MALE',
        birthday,
      },
    }));
  }, [
    saveFormQuery?.applicant?.name,
    saveFormQuery?.applicant?.phoneNumber,
    saveFormQuery?.applicant?.registrationNumber,
    setForm,
    userData,
  ]);

  type OnArg = string | ChangeEvent<HTMLInputElement>;

  const onFieldChange = (arg: OnArg) => {
    const name =
      typeof arg === 'string'
        ? (document.activeElement as HTMLInputElement | null)?.name ?? ''
        : arg.target.name;

    const value = typeof arg === 'string' ? arg : arg.target.value;
    if (!name) return;

    const nextVal = formatter[name] ? formatter[name](value) : value;

    setForm((prev) => ({
      ...prev,
      applicant: {
        ...prev.applicant,
        [name]: nextVal,
      },
    }));

    if (errors[name]?.length) {
      setErrors((prev) => ({ ...prev, [name]: [] }));
    }
  };

  const handleNextStep = () => {
    try {
      FormStep({
        schema: ApplicantSchema,
        formData: form.applicant,
        nextStep: '보호자정보',
        setErrors,
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors = err.flatten().fieldErrors;
        const normalizedErrors = Object.fromEntries(
          Object.entries(fieldErrors).map(([key, value]) => [key, value ?? []])
        );
        setErrors(normalizedErrors);
      }
    }
  };
  return { onFieldChange, handleNextStep, errors };
};
