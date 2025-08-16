import { useUser } from '@/hooks';
import { ApplicantSchema } from '@/schemas/ApplicantSchema';
import { useSaveFormQuery } from '@/services/form/queries';
import { useFormValueStore, useSetFormStore } from '@/stores';
import { useFormStep } from '@/utils';
import { useEffect, useState } from 'react';
import type { ChangeEvent } from 'react';
import { z } from 'zod';
import formatBirthday from '@/utils/formatBirthday';

export const useApplicantForm = () => {
  const form = useFormValueStore();
  const setForm = useSetFormStore();
  const { userData } = useUser();
  const { data: saveFormQuery } = useSaveFormQuery();
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const { run: FormStep } = useFormStep();

  const formatter: Record<string, (value: string) => string> = {
    registrationNumber: (value) => value.replace(/\D/g, ''),
    birthday: (value) => formatBirthday(value.replace(/\D/g, '')),
    phoneNumber: (value) => value.replace(/\D/g, ''),
    gender: () =>
      (form.applicant.registrationNumber ?? '').charAt(6) === '3' ? 'MALE' : 'FEMALE',
  };

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      applicant: {
        ...prev.applicant,
        name: saveFormQuery?.applicant.name ?? userData.name,
        phoneNumber: saveFormQuery?.applicant.phoneNumber ?? userData.phoneNumber,
      },
    }));
  }, [
    saveFormQuery?.applicant?.name,
    saveFormQuery?.applicant?.phoneNumber,
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
