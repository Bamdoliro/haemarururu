import { KEY } from '@/constants/common/constants';
import { useSchedule } from '@/services/schedule/queries';
import { useQuery } from '@tanstack/react-query';
import {
  getExportForm,
  getExportRecipt,
  getFormStatus,
  getSaveForm,
  getSchoolList,
} from './api';
import { useAuthState } from '@maru/hooks';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);

export const useFormStatusQuery = () => {
  const { isLoggedIn } = useAuthState();
  const { data, ...restQuery } = useQuery({
    queryKey: [KEY.FORM_STATUS],
    queryFn: getFormStatus,
    enabled: isLoggedIn,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

  return { data: data?.data, ...restQuery };
};

export const useExportFormQuery = () => {
  const { isLoggedIn } = useAuthState();
  const schedule = useSchedule();
  const day = dayjs();

  const { data, ...restQuery } = useQuery({
    queryKey: [KEY.EXPORT_FORM],
    queryFn: getExportForm,
    enabled: isLoggedIn && day.isBetween(schedule.원서_접수, schedule.원서_접수_마감),
    retry: false,
  });

  return { data, ...restQuery };
};

export const useExportReciptQuery = () => {
  const { isLoggedIn } = useAuthState();
  const schedule = useSchedule();
  const day = dayjs();

  const { data, ...restQuery } = useQuery({
    queryKey: [KEY.EXPORT_RECEIPT],
    queryFn: getExportRecipt,
    enabled: isLoggedIn && day.isBetween(schedule.원서_접수, schedule.원서_접수_마감),
    retry: false,
  });

  return { data, ...restQuery };
};

export const useSaveFormQuery = () => {
  const { isLoggedIn } = useAuthState();
  const { data, ...restQuery } = useQuery({
    queryKey: [KEY.SAVE_FORM],
    queryFn: getSaveForm,
    enabled: isLoggedIn,
    staleTime: Infinity,
    retry: false,
  });

  return { data: data?.data, ...restQuery };
};

export const useSchoolListQuery = (school: string) => {
  const { data, ...restQuery } = useQuery({
    queryKey: [KEY.SCHOOL_LIST, school],
    queryFn: () => getSchoolList(school),
    retry: false,
  });

  return { data: data?.dataList, ...restQuery };
};
