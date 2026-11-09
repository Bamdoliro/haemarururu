import { GED_SUBJECT_LIST } from '@/constants/form/data';
import type { Subject } from '@/types/form/client';
import { atom } from 'jotai';

export const subjectListAtom = atom<Subject[]>(GED_SUBJECT_LIST);

export const newSubjectListAtom = atom<Subject[]>([]);
