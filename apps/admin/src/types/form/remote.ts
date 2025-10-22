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
  formList: { formId: number; payment: boolean | null }[];
}

export interface GetFormDetail {
  data: FormDetail;
}

export interface PatchInterviewNumberReq {
  formList: { formId: number; interviewNumber: number | null }[];
}