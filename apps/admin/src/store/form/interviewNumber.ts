import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

const interviewNumberAtomState = atom<Record<number, string | null>>({
  key: 'interview-number',
  default: {},
});

export const useInterviewNumberStore = () => useRecoilState(interviewNumberAtomState);
export const useInterviewNumberValueStore = () =>
  useRecoilValue(interviewNumberAtomState);
export const useSetInterviewNumberStore = () =>
  useSetRecoilState(interviewNumberAtomState);
