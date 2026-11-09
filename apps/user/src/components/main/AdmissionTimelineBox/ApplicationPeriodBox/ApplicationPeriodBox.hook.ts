import { ROUTES } from '@/constants/common/constants';
import { useSchedule } from '@/services/schedule/queries';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const useSchoolRecruitDate = () => {
  const schedule = useSchedule();
  const router = useRouter();
  const [applicationStart, setApplicationStart] = useState('');
  const [applicationEnd, setApplicationEnd] = useState('');

  useEffect(() => {
    setApplicationStart(schedule.방문_원서_접수.format('YYYY년 M월 D일(ddd) HH:mm'));
    setApplicationEnd(schedule.원서_접수_마감.format('YYYY년 M월 D일(ddd) HH:mm'));
  }, [schedule]);

  const handleMoveFormPage = () => {
    router.push(ROUTES.FORM);
  };

  return { applicationStart, applicationEnd, handleMoveFormPage };
};
