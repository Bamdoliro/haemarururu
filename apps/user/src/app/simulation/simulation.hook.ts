import { formAtom } from '@/stores';
import { useState } from 'react';
import { useAtomValue } from 'jotai';

export const useNavigationClick = () => {
  const form = useAtomValue(formAtom);
  const [currentStep, setCurrentStep] = useState('성적 입력');

  const handleMoveStep = (step: string) => {
    const qualificationExam =
      form.education.graduationType === 'QUALIFICATION_EXAMINATION';
    const nowStep = step === '출결상황';

    if (qualificationExam && nowStep) {
      alert('검정고시 합격자는 기본 점수가 부여돼요.');
      return;
    }
    setCurrentStep(step);
  };

  return { handleMoveStep, currentStep };
};
