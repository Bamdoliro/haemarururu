import { maru } from '@/apis/instance/instance';
import type {
  GetCurrentScheduleRes,
  PutCurrentScheduleReq,
} from '@/types/schedule/remote';

export const getCurrentSchedule = async () => {
  const { data } = await maru.get<GetCurrentScheduleRes>('/admin/schedules/current');

  return data;
};

export const putCurrentSchedule = async (params: PutCurrentScheduleReq) => {
  const { data } = await maru.put('/admin/schedules/current', params);

  return data;
};
