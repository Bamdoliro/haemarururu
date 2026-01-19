import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

const isInterviewNumberEditingAtomState = atom<boolean>({
  key: 'is-interview-number-editing',
  default: false,
});

export const useIsInterviewNumberEditingStore = () =>
  useRecoilState(isInterviewNumberEditingAtomState);
export const useIsInterviewNumberEditingValueStore = () =>
  useRecoilValue(isInterviewNumberEditingAtomState);
export const useSetIsInterviewNumberEditingStore = () =>
  useSetRecoilState(isInterviewNumberEditingAtomState);
