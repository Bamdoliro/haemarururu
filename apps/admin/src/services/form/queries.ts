import { KEY } from '@/constants/common/constant';
import {
  getAllAdmissionTicket,
  getDocumentExportJob,
  getFormDetail,
  getFormList,
  getSecondScoreFormat,
} from './api';
import { useQuery } from '@tanstack/react-query';
import { formListSortingTypeAtom, formListTypeAtom } from '@/store';
import { useAtomValue } from 'jotai';

export const useFormListQuery = ({ enabled = true } = {}) => {
  const formListType = useAtomValue(formListTypeAtom);
  const formListSortingType = useAtomValue(formListSortingTypeAtom);

  const { data, ...restQuery } = useQuery({
    queryKey: [KEY.FORM_LIST, formListType, formListSortingType],
    queryFn: () => getFormList(formListType, formListSortingType),
    enabled,
  });

  return { data: data?.dataList, ...restQuery };
};

export const useExportSecondScoreFormatQuery = () => {
  const { data, ...restQuery } = useQuery({
    queryKey: [KEY.SECOND_SCORE_FORMAT],
    queryFn: getSecondScoreFormat,
  });

  return { data, ...restQuery };
};

export const useExportAllAdmissionTicket = () => {
  const { data, ...restQuery } = useQuery({
    queryKey: [KEY.FORM_EXPORT_ALL_ADMISSION_TICKET],
    queryFn: getAllAdmissionTicket,
    enabled: false,
  });

  return { data, ...restQuery };
};

export const useFormDetailQuery = (id: number) => {
  const { data, ...restQuery } = useQuery({
    queryKey: [KEY.FORM_DETAIL, id],
    queryFn: () => getFormDetail(id),
  });

  return { data: data?.data, ...restQuery };
};

export const useFormAllListQuery = ({ enabled = true } = {}) => {
  const formListSortingType = useAtomValue(formListSortingTypeAtom);

  const { data, ...restQuery } = useQuery({
    queryKey: ['전체 조회', formListSortingType],
    queryFn: () => getFormList('전체 조회', formListSortingType),
    enabled,
  });

  return { data: data?.dataList, ...restQuery };
};

const DOCUMENT_EXPORT_JOB_POLLING_INTERVAL = 3000;

export const useDocumentExportJobQuery = (jobId: number | null) => {
  const { data, ...restQuery } = useQuery({
    queryKey: [KEY.FORM_DOCUMENT_EXPORT_JOB, jobId],
    queryFn: () => getDocumentExportJob(jobId as number),
    enabled: jobId !== null,
    gcTime: 0,
    refetchInterval: (query) => {
      const status = query.state.data?.data.status;
      return status === 'COMPLETED' || status === 'FAILED'
        ? false
        : DOCUMENT_EXPORT_JOB_POLLING_INTERVAL;
    },
  });

  return { data: data?.data, ...restQuery };
};
