import { IntroductionSchema } from '@/schemas/IntroductionSchema';
import { useSaveFormMutation } from '@/services/form/mutations';
import { useFormStore, useSetFormGradeStepStore, useSetFormStepStore } from '@/stores';
import { useFormStep } from '@/utils';
import { useState, type ChangeEventHandler } from 'react';
import { z } from 'zod';
import { useToast } from '@/hooks';

export const useIntoductionForm = () => {
  const [form, setForm] = useFormStore();
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const setFormStep = useSetFormStepStore();
  const setFormGradeStep = useSetFormGradeStepStore();
  const { saveFormMutate } = useSaveFormMutation();
  const { run: FormStep } = useFormStep();
  const { toast } = useToast();

  const onFieldChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      document: { ...prev.document, [name]: value },
    }));
  };

  const handleNextStep = () => {
    try {
      FormStep({
        schema: IntroductionSchema,
        formData: form.document,
        nextStep: '초안작성완료',
        setErrors,
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        toast('금지어가 포함되어 있습니다.', 'ERROR');
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
      IntroductionSchema.parse(form.document);
      setErrors({});
      setFormStep('성적입력');
      setFormGradeStep('자격증');
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

  return { onFieldChange, handleNextStep, handlePreviousStep, errors };
};
