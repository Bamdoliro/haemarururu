import {
  useCorrectionFormMutation,
  useSubmitDraftFormMutation,
} from '@/services/form/mutations';
import { useFormStatusQuery } from '@/services/form/queries';
import { formAtom, formStepAtom, profileAtom } from '@/stores';
import { useAtomValue, useSetAtom } from 'jotai';

export const useCTAButton = () => {
  const form = useAtomValue(formAtom);
  const setProfile = useSetAtom(profileAtom);
  const setFormStep = useSetAtom(formStepAtom);
  const { submitDraftFormMutate } = useSubmitDraftFormMutation(form);
  const { correctionFormMutate } = useCorrectionFormMutation();
  const { data: statusData } = useFormStatusQuery();

  const handleCheckAgainForm = () => {
    setFormStep('지원자정보');
  };

  const handleSubmitDraftForm = () => {
    if (statusData?.status === 'REJECTED') {
      correctionFormMutate(form);
      setProfile({ fileName: '' });
    } else {
      submitDraftFormMutate();
      setProfile({ fileName: '' });
    }
  };

  return { handleCheckAgainForm, handleSubmitDraftForm };
};
