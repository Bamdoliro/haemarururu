import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

const isInterviewNumberResultEditing = atom<boolean>({
  key: 'is-interview-number-editing',
  default: false,
});

export const useIsInterviewNumberEditingStore = () =>
  useRecoilState(isInterviewNumberResultEditing);
export const useIsInterviewNumberEditingValueStore = () =>
  useRecoilValue(isInterviewNumberResultEditing);
export const useSetIsInterviewNumberEditingStore = () =>
  useSetRecoilState(isInterviewNumberResultEditing);
