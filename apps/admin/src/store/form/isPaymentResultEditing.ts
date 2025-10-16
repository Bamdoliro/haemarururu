import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

const isPaymentResultEditingAtomState = atom<boolean>({
  key: 'is-payment-result-editing',
  default: false,
});

export const useIsPaymentResultEditingStore = () =>
  useRecoilState(isPaymentResultEditingAtomState);
export const useIsPaymentResultEditingValueStore = () =>
  useRecoilValue(isPaymentResultEditingAtomState);
export const useSetIsPaymentResultEditingStore = () =>
  useSetRecoilState(isPaymentResultEditingAtomState);
