import type { PaymentStatusType } from '@/types/form/client';
import { atom } from 'jotai';

export const paymentResultAtom = atom<Record<number, PaymentStatusType>>({});
