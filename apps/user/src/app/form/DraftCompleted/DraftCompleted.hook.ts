import {
  useCorrectionFormMutation,
  useSubmitDraftFormMutation,
} from '@/services/form/mutations';
import { useFormStatusQuery } from '@/services/form/queries';
import { useSchedule } from '@/services/schedule/queries';
import { formAtom, formStepAtom, profileAtom } from '@/stores';
import { formatResultDateTime } from '@/utils';
import dayjs from 'dayjs';
import { useAtomValue, useSetAtom } from 'jotai';

export const useCTAButton = () => {
  const form = useAtomValue(formAtom);
  const setProfile = useSetAtom(profileAtom);
  const setFormStep = useSetAtom(formStepAtom);
  const schedule = useSchedule();
  const { submitDraftFormMutate } = useSubmitDraftFormMutation(form);
  const { correctionFormMutate } = useCorrectionFormMutation();
  const { data: statusData } = useFormStatusQuery();

  const handleCheckAgainForm = () => {
    setFormStep('지원자정보');
  };

  const handleSubmitDraftForm = () => {
    const now = dayjs();

    if (now.isBefore(schedule.방문_원서_접수)) {
      alert(
        `원서 제출은 ${formatResultDateTime(schedule.방문_원서_접수)}부터 가능합니다.`,
      );
      return;
    }

    if (!now.isBefore(schedule.원서_접수_마감)) {
      alert('원서 접수 기간이 마감되어 원서를 제출할 수 없습니다.');
      return;
    }

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
