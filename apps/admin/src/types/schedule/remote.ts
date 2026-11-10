import type { Schedule, ScheduleDateTimes } from './client';

export interface GetCurrentScheduleRes {
  data: Schedule;
}

export interface PutCurrentScheduleReq extends ScheduleDateTimes {
  admissionYear: number;
  version: number;
}
