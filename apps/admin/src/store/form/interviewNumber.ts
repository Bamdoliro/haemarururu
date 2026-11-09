import { atom } from 'jotai';

export const interviewNumberAtom = atom<Record<number, string | null>>({});
