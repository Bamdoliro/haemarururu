import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

const deleteFairAttendeeAtomState = atom<Record<number, boolean>>({
  key: 'delete-fair-attendee',
  default: {},
});

export const useDeleteFairAttendeeStore = () =>
  useRecoilState(deleteFairAttendeeAtomState);
export const useDeleteFairAttendeeValueStore = () =>
  useRecoilValue(deleteFairAttendeeAtomState);
export const useSetDeleteFairAttendeeStore = () =>
  useSetRecoilState(deleteFairAttendeeAtomState);
