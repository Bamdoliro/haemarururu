import { z } from 'zod';

export const GuardianSchema = z.object({
  name: z
    .string()
    .trim()
    .nonempty('이름을 입력해 주세요.')
    .min(2, '이름은 2자 이상이어야 합니다.')
    .max(20, '이름은 20자 이하이어야 합니다.'),
  phoneNumber: z
    .string()
    .trim()
    .nonempty('전화번호를 입력해주세요.')
    .regex(/^\d{11}$/, '전화번호는 11자리를 입력해주세요.'),
  relation: z.string().trim().nonempty('올바른 값을 입력해주세요'),
  address: z
    .string()
    .trim()
    .nonempty('주소를 입력해주세요.')
    .max(100, '주소를 입력해주세요.'),
  detailAddress: z
    .string()
    .trim()
    .nonempty('알맞은 상세 주소를 입력해 주세요.')
    .max(100, '알맞은 상세 주소를 입력해 주세요.'),
  account: z
    .string()
    .trim()
    .nonempty('환불계좌를 입력해주세요.')
    .min(10, '환불계좌는 최소 10자 이상이어야 합니다.')
    .max(15, '환불계좌는 최대 15자 이하여야 합니다.')
    .refine((value) => /^\d+$/.test(value), '숫자만 입력 가능합니다.')
    .default(''),
  bank: z
    .string()
    .trim()
    .nonempty('은행을 입력해주세요.')
    .min(2, '은행은 최소 2자 이상이어야 합니다.')
    .default(''),
  owner: z
    .string()
    .trim()
    .nonempty('예금주명을 입력해 주세요.')
    .min(2, '예금주명은 2자 이상이어야 합니다.')
    .max(20, '예금주명은 20자 이하이어야 합니다.'),
});
