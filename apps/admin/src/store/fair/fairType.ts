import type { FairFormInput } from '@/types/fair/client';
import { atom } from 'jotai';

export const fairFormAtom = atom<FairFormInput>({
  start: '',
  capacity: '',
  place: '',
  type: 'STUDENT_AND_PARENT',
  applicationStartDate: null,
  applicationEndDate: null,
});
