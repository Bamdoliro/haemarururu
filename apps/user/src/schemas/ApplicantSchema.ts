import { z } from 'zod';

export const ApplicantSchema = z.object({
  name: z
    .string()
    .trim()
    .nonempty('이름을 입력해 주세요.')
    .min(2, '이름은 2자 이상이어야 합니다.')
    .max(20, '이름은 20자 이하이어야 합니다.'),
  registrationNumber: z
    .string()
    .regex(/^\d{6}-\d{7}$/, '주민등록번호는 13자리여야 합니다.')
    .length(14, '주민등록번호는 13자리여야 합니다.'),
  phoneNumber: z
    .string()
    .trim()
    .nonempty('전화번호를 입력해주세요.')
    .regex(/^\d{11}$/, '전화번호는 11자리를 입력해주세요.'),
});
