import { atom, useRecoilState, useRecoilValue } from 'recoil';
import type { FairFormInput } from '@/types/fair/client';

const fairFormState = atom<FairFormInput>({
  key: 'FairFormAtom',
  default: {
    start: '',
    capacity: '',
    place: '',
    type: 'STUDENT_AND_PARENT',
    applicationStartDate: null,
    applicationEndDate: null,
  },
});

export const useFairFormStore = () => useRecoilState(fairFormState);
export const useFairFormValueStore = () => useRecoilValue(fairFormState);
