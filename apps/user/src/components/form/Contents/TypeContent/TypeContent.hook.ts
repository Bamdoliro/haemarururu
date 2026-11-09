import { useSaveFormMutation } from '@/services/form/mutations';
import { formAtom, formStepAtom } from '@/stores';
import { useFormStep } from '@/utils';
import type { ChangeEventHandler } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';

export const useCTAButton = () => {
  const form = useAtomValue(formAtom);
  const setFormStep = useSetAtom(formStepAtom);
  const { saveFormMutate } = useSaveFormMutation();
  const { run: FormStep } = useFormStep();

  const handleNextStep = () => {
    FormStep({
      nextStep: '성적입력',
    });
  };

  const handlePreviousStep = () => {
    setFormStep('출신학교및학력');
    saveFormMutate(form);
  };

  return { handleNextStep, handlePreviousStep };
};

export const useRadio = () => {
  const setForm = useSetAtom(formAtom);

  const handleFormTypeChange: ChangeEventHandler<HTMLInputElement> = ({
    target: { name, value },
  }) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return { handleFormTypeChange };
};
