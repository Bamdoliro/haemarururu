import { maru } from '@/apis/instance/instance';
import type { GetFairListRes } from '@/types/fair/remote';

export const getFairData = async () => {
  const { data } = await maru.get<GetFairListRes>(`/fairs`);
  return data;
};
