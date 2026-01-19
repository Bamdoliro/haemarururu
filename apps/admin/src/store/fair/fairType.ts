import type { FairFormInput } from '@/types/fair/client';
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

const fairFormAtomState = atom<FairFormInput>({
  key: 'fair-form',
  default: {
    start: '',
    capacity: '',
    place: '',
    type: 'STUDENT_AND_PARENT',
    applicationStartDate: null,
    applicationEndDate: null,
  },
});

export const useFairFormStore = () => useRecoilState(fairFormAtomState);
export const useFairFormValueStore = () => useRecoilValue(fairFormAtomState);
export const useSetFairFormStore = () => useSetRecoilState(fairFormAtomState);
