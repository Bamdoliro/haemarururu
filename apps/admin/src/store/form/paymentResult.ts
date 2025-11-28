import type { PaymentStatusType } from '@/types/form/client';
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

const paymentResultAtomState = atom<Record<number, PaymentStatusType>>({
  key: 'payment-result',
  default: {},
});

export const usePaymentResultStore = () => useRecoilState(paymentResultAtomState);
export const usePaymentResultValueStore = () => useRecoilValue(paymentResultAtomState);
export const useSetPaymentResultStore = () => useSetRecoilState(paymentResultAtomState);
