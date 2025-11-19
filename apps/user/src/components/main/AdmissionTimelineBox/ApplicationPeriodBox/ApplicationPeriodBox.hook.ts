import { ROUTES, SCHEDULE } from '@/constants/common/constants';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

export const useSchoolRecruitDate = () => {
  const router = useRouter();
  const [applicationStart, setApplicationStart] = useState('');
  const [applicationEnd, setApplicationEnd] = useState('');

  useEffect(() => {
    setApplicationStart(
      dayjs('2025-12-08T00:00:00+09:00').format('YYYY년 MM월 DD일 (ddd) HH:mm')
    );
    setApplicationEnd(SCHEDULE.원서_접수_마감.format('YYYY년 MM월 DD일 (ddd) HH:mm'));
  }, []);

  const handleMoveFormPage = () => {
    router.push(ROUTES.FORM);
  };

  return { applicationStart, applicationEnd, handleMoveFormPage };
};
