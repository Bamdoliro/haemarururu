import { z } from 'zod';
import { FORBIDDEN_WORDS } from '@/constants/form/constants';

const forbidWords = (value: string) => {
  const lowerValue = value.toLowerCase();
  return !FORBIDDEN_WORDS.some((word) => lowerValue.includes(word.toLowerCase()));
};

const getForbiddenWord = (value: string): string | null => {
  const lowerValue = value.toLowerCase();
  const found = FORBIDDEN_WORDS.find((word) => lowerValue.includes(word.toLowerCase()));
  return found || null;
};

const maxLengthWithoutSpaces = (max: number) => (value: string) => {
  const lengthWithoutSpaces = value.replace(/\s/g, '').length;
  return lengthWithoutSpaces <= max;
};

export const IntroductionSchema = z.object({
  learningExperience: z
    .string()
    .trim()
    .min(1, '성취감을 느꼈던 학습 경험을 입력해주세요.')
    .refine(maxLengthWithoutSpaces(700), {
      message: '성취감을 느꼈던 학습 경험은 700자 이내(공백 제외)로 작성해주세요.',
    })
    .refine(forbidWords, (value) => ({
      message: `'${getForbiddenWord(value)}'를 포함할 수 없습니다.`,
    })),

  statementOfPurpose: z
    .string()
    .trim()
    .min(1, '활동계획과 졸업 후 진로계획을 입력해주세요.')
    .refine(maxLengthWithoutSpaces(300), {
      message: '활동계획과 졸업 후 진로계획은 300자 이내(공백 제외)로 작성해주세요.',
    })
    .refine(forbidWords, (value) => ({
      message: `'${getForbiddenWord(value)}'를 포함할 수 없습니다.`,
    })),

  personality: z
    .string()
    .trim()
    .min(1, '본인의 인성관련 개인적 경험을 입력해주세요.')
    .refine(maxLengthWithoutSpaces(500), {
      message: '본인의 인성관련 개인적 경험은 500자 이내(공백 제외)로 작성해주세요.',
    })
    .refine(forbidWords, (value) => ({
      message: `'${getForbiddenWord(value)}'를 포함할 수 없습니다.11`,
    })),
});
