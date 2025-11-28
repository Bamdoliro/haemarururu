import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

const isDeleteFairAttendeeEditingAtomState = atom<boolean>({
  key: 'is-delete-fair-attendee-editing',
  default: false,
});

export const useIsDeleteFairAttendeeEditingStore = () =>
  useRecoilState(isDeleteFairAttendeeEditingAtomState);
export const useIsDeleteFairAttendeeEditingValueStore = () =>
  useRecoilValue(isDeleteFairAttendeeEditingAtomState);
export const useSetIsDeleteFairAttendeeEditingStore = () =>
  useSetRecoilState(isDeleteFairAttendeeEditingAtomState);
