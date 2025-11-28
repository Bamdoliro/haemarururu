import { z } from 'zod';

const qualificationSchema = z.object({
  graduationType: z.literal('QUALIFICATION_EXAMINATION'),
  graduationDate: z
    .string()
    .trim()
    .nonempty('합격 일자를 입력해주세요.')
    .regex(/^\d{4}-\d{2}-\d{2}$/, '합격 일자를 입력해주세요.'),
});

const schoolGraduateSchema = z.object({
  graduationType: z.enum(['EXPECTED', 'GRADUATED']),
  schoolName: z
    .string()
    .trim()
    .max(30, '출신 학교를 입력해주세요.')
    .nullable()
    .refine((val) => !!val && val.trim() !== '', '출신 학교를 입력해주세요.'),
  graduationDate: z
    .string()
    .trim()
    .nonempty('졸업(예정) 일자를 입력해주세요.')
    .regex(/^\d{4}-\d{2}-\d{2}$/, '졸업(예정) 일자를 입력해주세요.'),
  schoolPhoneNumber: z
    .string()
    .trim()
    .min(10, '10자 이상 입력해주세요.')
    .max(11, '11자 이하로 입력해주세요.')
    .nullable()
    .refine((val) => !!val && val.trim() !== '', '전화번호를 입력해주세요.'),
  teacherName: z
    .string()
    .trim()
    .min(2, '작성 교사 이름을 입력해주세요.')
    .nullable()
    .refine((val) => !!val && val.trim() != '', '작성 교사 이름을 입력해주세요.'),
  teacherMobilePhoneNumber: z
    .string()
    .trim()
    .regex(/^\d{11}$/, '11자리를 입력해주세요.')
    .nullable()
    .refine((val) => !!val && val.trim() !== '', '전화번호를 입력해주세요.'),
});

export const EducationSchema = z.discriminatedUnion('graduationType', [
  qualificationSchema,
  schoolGraduateSchema,
]);
