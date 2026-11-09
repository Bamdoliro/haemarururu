import { useSaveFormMutation } from '@/services/form/mutations';
import { formAtom, formGradeStepAtom } from '@/stores';
import { useFormStep } from '@/utils';
import { useAtomValue, useSetAtom } from 'jotai';

export const useCTAButton = () => {
  const form = useAtomValue(formAtom);
  const setFormGradeStep = useSetAtom(formGradeStepAtom);
  const { saveFormMutate } = useSaveFormMutation();
  const { run: FormStep } = useFormStep();

  const handleNextStep = () => {
    FormStep({
      nextStep: '자기소개서',
    });
  };

  const handlePreviousStep = () => {
    setFormGradeStep('교과성적');
    saveFormMutate(form);
  };

  return { handleNextStep, handlePreviousStep };
};
