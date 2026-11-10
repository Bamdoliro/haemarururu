import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { KEY } from '@/constants/common/constants';
import type { GetCurrentScheduleRes } from '@/types/schedule/remote';
import { getCurrentSchedule } from './api';

const selectSchedule = ({ data }: GetCurrentScheduleRes) => ({
  원서_접수: dayjs(data.applicationFormStart),
  방문_원서_접수: dayjs(data.visitSubmissionAt),
  원서_접수_마감: dayjs(data.applicationFormEnd),
  일차_합격_발표: dayjs(data.announcementOfFirstPass),
  이차_면접: dayjs(data.interviewStart),
  이차_면접_종료: dayjs(data.interviewEnd),
  최종_합격_발표: dayjs(data.announcementOfFinalPass),
  입학_등록: dayjs(data.registrationStart),
  입학_등록_마감: dayjs(data.registrationEnd),
  출결_기준일: dayjs(data.attendanceStandardDate),
  점검_시작: data.maintenanceStart ? dayjs(data.maintenanceStart) : null,
  점검_종료: data.maintenanceEnd ? dayjs(data.maintenanceEnd) : null,
});

export type Schedule = ReturnType<typeof selectSchedule>;

export const useScheduleQuery = () => {
  const { data, ...restQuery } = useQuery({
    queryKey: [KEY.SCHEDULE],
    queryFn: getCurrentSchedule,
    select: selectSchedule,
    staleTime: Infinity,
  });

  return { data, ...restQuery };
};

export const useSchedule = () => {
  const { data } = useScheduleQuery();

  if (!data) {
    throw new Error('useSchedule은 ScheduleGate 내부에서만 사용할 수 있습니다.');
  }

  return data;
};
