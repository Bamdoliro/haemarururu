import type { Fair, FairData, FairDetailData } from './client';

export interface GetFairListRes {
  dataList: FairData[];
}

export interface GetFairDetailRes {
  data: FairDetailData;
}

export interface PatchFairAttendeeResultReq {
  attendeeList: { attendeeId: number }[];
}

export type PutFairReq = Fair;
