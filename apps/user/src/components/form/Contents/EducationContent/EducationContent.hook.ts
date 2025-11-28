import { EducationSchema } from '@/schemas/EducationSchema';
import { useSaveFormMutation } from '@/services/form/mutations';
import { useFormStore, useSetFormGradeStepStore, useSetFormStepStore } from '@/stores';
import { useFormStep } from '@/utils';
import type { ChangeEventHandler } from 'react';
import { useState } from 'react';
import { z } from 'zod';

export const useEducationForm = () => {
  const [form, setForm] = useFormStore();
  const setFormStep = useSetFormStepStore();
  const setFormGradeStep = useSetFormGradeStepStore();
  const { saveFormMutate } = useSaveFormMutation();
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const { run: FormStep } = useFormStep();

  const numberFiled = ['schoolPhoneNumber', 'teacherMobilePhoneNumber'];

  const handleNextStep = () => {
    try {
      FormStep({
        schema: EducationSchema,
        formData: form.education,
        nextStep: '전형선택',
        setErrors,
      });
      setFormGradeStep('교과성적');
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

  const handlePreviousStep = () => {
    try {
      EducationSchema.parse(form.education);
      setErrors({});
      setFormStep('보호자정보');
      saveFormMutate(form);
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

  const onFieldChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;

    if (numberFiled.includes(name) && /\D/.test(value)) return;

    let newValue = value;

    if (name === 'graduationDate') {
      const onlyNums = value.replace(/[^0-9]/g, '');
      if (onlyNums.length === 8) {
        newValue = `${onlyNums.slice(0, 4)}-${onlyNums.slice(4, 6)}-${onlyNums.slice(
          6,
          8
        )}`;
      } else {
        newValue = onlyNums;
      }
    }

    setForm((prev) => ({
      ...prev,
      education: {
        ...prev.education,
        [name]: newValue,
      },
    }));

    if (errors[name]?.length) {
      setErrors((prev) => ({ ...prev, [name]: [] }));
    }
  };

  return { onFieldChange, handleNextStep, handlePreviousStep, errors };
};
