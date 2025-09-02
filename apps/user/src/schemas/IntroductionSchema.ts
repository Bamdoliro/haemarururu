import { z } from 'zod';
import { FORBIDDEN_WORDS } from '@/constants/form/constants';
const forbidWords = (value: string) =>
  !FORBIDDEN_WORDS.some((word) => value.includes(word));

export const IntroductionSchema = z.object({
  learningExperience: z
    .string()
    .trim()
    .min(1, '성취감을 느꼈던 학습 경험을 입력해주세요.')
    .max(1000, '성취감을 느꼈던 학습 경험은 1000자 이내로 작성해주세요.')
    .refine(forbidWords, { message: '금지어를 포함할 수 없습니다.' }),

  statementOfPurpose: z
    .string()
    .trim()
    .min(1, '활동계획과 졸업 후 진로계획을 입력해주세요.')
    .max(300, '활동계획과 졸업 후 진로계획은 300자 이내로 작성해주세요.')
    .refine(forbidWords, { message: '금지어를 포함할 수 없습니다.' }),

  personality: z
    .string()
    .trim()
    .min(1, '본인의 인성관련 개인적 경험을 입력해주세요.')
    .max(500, '본인의 인성관련 개인적 경험은 500자 이내로 작성해주세요.')
    .refine(forbidWords, { message: '금지어를 포함할 수 없습니다.' }),
});
