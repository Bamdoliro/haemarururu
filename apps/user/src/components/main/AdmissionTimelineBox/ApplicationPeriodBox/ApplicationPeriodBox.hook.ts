import { ROUTES } from '@/constants/common/constants';
import { SCHEDULE } from '@/constants/form/constants';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const useSchoolRecruitDate = () => {
  const router = useRouter();
  const [applicationStart, setApplicationStart] = useState('');
  const [applicationEnd, setApplicationEnd] = useState('');

  useEffect(() => {
    setApplicationStart(SCHEDULE.원서_접수.format('YYYY년 MM월 DD일 (ddd) HH:mm'));
    setApplicationEnd(SCHEDULE.원서_접수_마감.format('YYYY년 MM월 DD일 (ddd) HH:mm'));
  }, []);

  const handleMoveFormPage = () => {
    router.push(ROUTES.FORM);
  };

  return { applicationStart, applicationEnd, handleMoveFormPage };
};
