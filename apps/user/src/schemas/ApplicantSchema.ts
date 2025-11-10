import { z } from 'zod';

export const ApplicantSchema = z.object({
  name: z
    .string()
    .trim()
    .nonempty('이름을 입력해 주세요.')
    .min(2, '이름은 2자 이상이어야 합니다.')
    .max(20, '이름은 20자 이하이어야 합니다.'),
  registrationNumberFront: z
    .string()
    .trim()
    .nonempty('앞자리를 입력해 주세요.')
    .regex(/^\d{6}$/, '6자리를 입력해주세요.'),
  registrationNumberBack: z
    .string()
    .trim()
    .nonempty('뒷자리를 입력해 주세요.')
    .regex(/^\d{7}$/, '7자리를 입력해주세요.')
    .refine(
      (value) => ['1', '3'].includes(value.charAt(0)),
      '주민등록번호를 다시 확인해주세요'
    ),
  phoneNumber: z
    .string()
    .trim()
    .nonempty('전화번호를 입력해주세요.')
    .regex(/^\d{11}$/, '전화번호는 11자리를 입력해주세요.'),
  profile: z.string().nonempty('증명사진을 업로드해 주세요.'),
  email: z
    .string({ message: '이메일을 입력해주세요.' })
    .trim()
    .nonempty('이메일을 입력해주세요.')
    .email('올바른 이메일을 입력해주세요.')
});
