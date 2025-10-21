import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

const isInterviewNumberEditing = atom<boolean>({
  key: 'is-interview-number-editing',
  default: false,
});

export const useIsInterviewNumberEditingStore = () =>
  useRecoilState(isInterviewNumberEditing);
export const useIsInterviewNumberEditingValueStore = () =>
  useRecoilValue(isInterviewNumberEditing);
export const useSetIsInterviewNumberEditingStore = () =>
  useSetRecoilState(isInterviewNumberEditing);
