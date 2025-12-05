import { useState } from 'react';
import { FaqAllCategoryList, type FaqAllCategory } from '@/types/faq/client';

export const useFaqPageState = () => {
  const [selectedCategory, setSelectedCategory] = useState<FaqAllCategory | null>(null);

  const handleChangeFaqCategory = (value: string) => {
    setSelectedCategory(value as FaqAllCategory);
  };

  const getFaqCategoryDropdownValue = () => {
    return selectedCategory ? FaqAllCategoryList[selectedCategory] : undefined;
  };

  return {
    selectedCategory,
    handleChangeFaqCategory,
    getFaqCategoryDropdownValue,
  };
};
