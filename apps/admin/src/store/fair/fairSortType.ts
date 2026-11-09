import type { FairListSortingType, FairListType } from '@/types/fair/client';
import { atom } from 'jotai';

export const fairListTypeAtom = atom<FairListType>('모두 보기');

export const fairListSortingTypeAtom = atom<FairListSortingType>({
  sort: null,
});
