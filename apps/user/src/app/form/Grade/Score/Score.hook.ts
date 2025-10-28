import { useSaveFormMutation } from '@/services/form/mutations';
import {
  useFormValueStore,
  useNewSubjectListValueStore,
  useSetFormGradeStepStore,
  useSetFormStepStore,
  useSubjectListValueStore,
  useNewGEDSubjectListValueStore,
} from '@/stores';
import { useState } from 'react';
import { useFormStep } from '@/utils';

export const useCTAButton = () => {
  const form = useFormValueStore();
  const subjectList = useSubjectListValueStore();
  const newSubjectList = useNewSubjectListValueStore();
  const newGEDSubjectList = useNewGEDSubjectListValueStore();
  const SUBJECT_OPTIONS = ['도덕', '기술가정', '음악', '체육', '미술'];
  const { run: FormStep } = useFormStep();
  const setFormStep = useSetFormStepStore();
  const setFormGradeStep = useSetFormGradeStepStore();
  const { saveFormMutate } = useSaveFormMutation();

  const [subjectError, setSubjectError] = useState<boolean[]>([]);
  const [newSubjectError, setNewSubjectError] = useState<boolean[]>([]);
  const [newGEDSubjectError, setNewGEDSubjectError] = useState<boolean[]>([]);

  const validateSubjects = () => {
    const type = form.education.graduationType === 'QUALIFICATION_EXAMINATION';

    if (type) {
      const newGEDErrors = newGEDSubjectList.map(
        (subject) =>
          !subject.subjectName ||
          subject.subjectName === '-' ||
          subject.subjectName === '' ||
          !SUBJECT_OPTIONS.includes(subject.subjectName)
      );

      setNewGEDSubjectError(newGEDErrors);

      const hasGEDError = newGEDErrors.some((error) => error);
      if (hasGEDError) {
        alert('올바른 과목을 선택해주세요.');
        return false;
      }
      return true;
    }
    const subjectErrors = subjectList.map(
      (subject) =>
        subject.achievementLevel21 === '-' ||
        subject.achievementLevel22 === '-' ||
        subject.achievementLevel31 === '-' ||
        subject.achievementLevel32 === '-'
    );

    const newSubjectErrors = newSubjectList.map(
      (subject) =>
        !subject.subjectName ||
        subject.subjectName === '-' ||
        subject.subjectName === '' ||
        subject.achievementLevel21 === '-' ||
        subject.achievementLevel22 === '-' ||
        subject.achievementLevel31 === '-' ||
        subject.achievementLevel32 === '-'
    );

    setSubjectError(subjectErrors);
    setNewSubjectError(newSubjectErrors);

    const hasError =
      subjectErrors.some((error) => error) || newSubjectErrors.some((error) => error);

    if (hasError) {
      alert(`'-'를 자신의 성취수준으로 입력해주세요`);
    }
    return !hasError;
  };

  const handleNextStep = () => {
    if (validateSubjects()) {
      if (form.education.graduationType === 'QUALIFICATION_EXAMINATION') {
        FormStep({
          nextStep: '자기소개서',
        });
      } else {
        setFormGradeStep('출결상황');
        saveFormMutate(form);
      }
    }
  };

  const handlePreviousStep = () => {
    if (validateSubjects()) {
      setFormStep('전형선택');
      saveFormMutate(form);
    }
  };

  return {
    handleNextStep,
    handlePreviousStep,
    subjectError,
    newSubjectError,
    newGEDSubjectError,
  };
};
