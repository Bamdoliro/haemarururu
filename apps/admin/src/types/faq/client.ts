export type FaqCategory =
  | 'SCHOOL_LIFE'
  | 'SUBMIT_DOCUMENT'
  | 'ADMISSION_PROCESS'
  | 'TOP_QUESTION';

export type FaqAllCategory = FaqCategory | 'ALL_FAQS';

export interface Faq {
  id: number;
  title: string;
  content: string;
  category: FaqCategory;
  createdAt: string;
}

export type FaqInput = Omit<Faq, 'id' | 'createdAt'>;

export interface FaqCategoryOption {
  value: FaqCategory;
  label: string;
}

export const FaqAllCategoryList: Record<FaqAllCategory, string> = {
  ALL_FAQS: '전체 보기',
  SCHOOL_LIFE: '학교 생활',
  SUBMIT_DOCUMENT: '관련 제출 서류',
  ADMISSION_PROCESS: '입학 과정',
  TOP_QUESTION: '질문 TOP',
};
