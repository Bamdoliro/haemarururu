import type { FormStep } from '@/types/form/client';
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

const formStepAtomState = atom<FormStep>({
  key: 'form-step',
  default: '성적입력',
});

export const useFormStepStore = () => useRecoilState(formStepAtomState);
export const useSetFormStepStore = () => useSetRecoilState(formStepAtomState);
export const useFormStepValueStore = () => useRecoilValue(formStepAtomState);
