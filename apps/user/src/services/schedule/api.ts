import { maru } from '@/apis/instance/instance';
import type { GetCurrentScheduleRes } from '@/types/schedule/remote';

export const getCurrentSchedule = async () => {
  const { data } = await maru.get<GetCurrentScheduleRes>('/schedules/current');

  return data;
};
