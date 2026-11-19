import type { Form, FormDetail } from './client';

export interface GetFormListRes {
  dataList: Form[];
}

export interface GetFormURLRes {
  dataList: {
    examinationNumber: number;
    name: string;
    formUrl: string;
  }[];
}

export interface PatchSecondRoundResultReq {
  formList: { formId: number; pass: boolean | null }[];
}

export interface PatchPaymentResultReq {
  formList: { formId: number; paid: boolean | null }[];
}

export interface GetFormDetail {
  data: FormDetail;
}

export interface PatchInterviewNumberReq {
  formList: { formId: number; interviewNumber: string | null }[];
}

export type DocumentExportJobStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';

export interface DocumentExportJob {
  id: number;
  status: DocumentExportJobStatus;
  downloadUrl: string | null;
  errorMessage: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PostDocumentExportJobRes {
  data: { id: number };
}

export interface GetDocumentExportJobRes {
  data: DocumentExportJob;
}
