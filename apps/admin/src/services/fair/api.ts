import { maru } from '@/apis/instance/instance';
import type { Fair } from '@/types/fair/client';
import type { GetFairListRes, GetFairDetailRes, PutFairReq } from '@/types/fair/remote';

export const getFairList = async () => {
  const { data } = await maru.get<GetFairListRes>(`/fairs`);

  return data;
};

export const getFairDetail = async (id: number, sort?: string | null) => {
  const params = sort ? { sort } : {};
  const { data } = await maru.get<GetFairDetailRes>(`/fairs/${id}`, {
    params,
  });

  return data;
};

export const getFairExportExcel = async (id: number) => {
  const { data } = await maru.get(`/fairs/${id}/export`, {
    responseType: 'blob',
  });

  return data;
};

export const postFairReq = async (fairdata: Fair) => {
  const { data } = await maru.post(`/fairs`, fairdata);

  return data;
};

export const putFair = async (fairId: number, param: PutFairReq) => {
  const { data } = await maru.put(`/fairs/${fairId}`, param);

  return data;
};

export const deleteFair = async (fairId: number) => {
  const { data } = await maru.delete(`/fairs/${fairId}`);

  return data;
};

export const deleteFairAttendee = async (
  fairId: number,
  attendeeList: { attendeeId: number }[]
) => {
  const { data } = await maru.delete(`/fairs/${fairId}/attendees`, {
    data: { attendeeList },
  });

  return data;
};
