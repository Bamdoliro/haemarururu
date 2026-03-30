import { usePostFaqMutation } from '@/services/faq/mutations';
import { useState } from 'react';
import type { FaqCategory, FaqInput } from '@/types/faq/client';
import type { ChangeEventHandler } from 'react';

export const useFaqCreateData = () => {
  const [faqData, setFaqData] = useState<FaqInput>({
    title: '',
    content: '',
    category: 'SCHOOL_LIFE',
  });

  const handleFaqDataChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setFaqData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFaqCategoryChange = (value: string) => {
    setFaqData((prev) => ({ ...prev, category: value as FaqCategory }));
  };

  const handleContentChange = (value: string) => {
    setFaqData((prev) => ({ ...prev, content: value }));
  };

  return {
    faqData,
    setFaqData,
    handleFaqDataChange,
    handleFaqCategoryChange,
    handleContentChange,
  };
};

export const useFaqCreateAction = (faqData: FaqInput) => {
  const { postFaqMutate } = usePostFaqMutation();

  const handleFaqCreateButtonClick = () => {
    postFaqMutate(faqData);
  };

  return { handleFaqCreateButtonClick };
};
