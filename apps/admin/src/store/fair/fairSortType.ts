import type { FairListSortingType, FairListType } from '@/types/fair/client';
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

const fairListTypeAtomState = atom<FairListType>({
  key: 'fair-type',
  default: '모두 보기',
});

const fairListSortingTypeAtomState = atom<FairListSortingType>({
  key: 'fair-sort-type',
  default: {
    sort: null,
  },
});

export const useFairListTypeStore = () => useRecoilState(fairListTypeAtomState);
export const useFairListTypeValueStore = () => useRecoilValue(fairListTypeAtomState);
export const useSetFairListTypeStore = () => useSetRecoilState(fairListTypeAtomState);

export const useFairListSortingTypeStore = () =>
  useRecoilState(fairListSortingTypeAtomState);
export const useFairListSortingTypeValueStore = () =>
  useRecoilValue(fairListSortingTypeAtomState);
export const useSetFairListSortingTypeStore = () =>
  useSetRecoilState(fairListSortingTypeAtomState);
