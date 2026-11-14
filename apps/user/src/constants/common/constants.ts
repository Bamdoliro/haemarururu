import dayjs from 'dayjs';
import 'dayjs/locale/ko';

dayjs.locale('ko');
export const ROUTES = {
  MAIN: '/',
  FORM: '/form',
  FORM_MANAGEMENT: '/management',
  NOTICE: '/notice',
  FAQ: '/faq',
  ADMISSION_REGISTRATION: '/enrollment',
  TERMS_OF_SERVICE: '/tos',
  PRIVACY_POLCY: '/privacy',
  PERSONAL_INFO_COLLECTION: '/collection',
  FAIR: '/fair',
  FIRST_RESULT: '/result/first',
  FINAL_RESULT: '/result/final',
  SIMULATION: '/simulation',
  LOGIN: '/login',
  PASSWORD: '/password',
  SIGNUP: '/signup',
  WITHDRAWAL: '/withdrawal',
  SCHOOL: 'https://school.busanedu.net/haeundae-h',
};

export const AUTH_COOKIES = ['accessToken', 'refreshToken'] as const;

export const KEY = {
  NOTICE_LIST: 'useNoticeList',
  NOTICE_DETAIL: 'useNoticeDetail',
  FAQ_LIST: 'useFaqList',
  FAIR_LIST: 'useFairList',
  USER: 'useUser',
  FIRST_RESULT: 'useFirstResult',
  FINAL_RESULT: 'useFinalResult',
  ADMISSION_TICKET: 'useDownloadAdmissionTicket',
  FORM_STATUS: 'useFormStatus',
  EXPORT_FORM: 'useExportForm',
  SAVE_FORM: 'useSaveForm',
  SCHOOL_LIST: 'useSchoolList',
  FAIR_DATA: 'useFairData',
  SCHEDULE: 'useSchedule',
};

// 세션 만료 시 제거할 사용자 데이터 쿼리. 일정처럼 비로그인에도 쓰이는 쿼리는 남긴다.
export const USER_SCOPED_KEYS = [
  KEY.USER,
  KEY.FIRST_RESULT,
  KEY.FINAL_RESULT,
  KEY.ADMISSION_TICKET,
  KEY.FORM_STATUS,
  KEY.EXPORT_FORM,
  KEY.SAVE_FORM,
] as const;

export const PHONE_NUMBER = {
  ADMISSION_OFFICER_ONE: process.env.NEXT_PUBLIC_ADMISSION_OFFICER_ONE,
  ADMISSION_OFFICER_TWO: process.env.NEXT_PUBLIC_ADMISSION_OFFICER_TWO,
  TEACHER_OFFICE_PHONE_NUMBER: process.env.NEXT_PUBLIC_TEACHER_OFFICE_PHONE_NUMBER,
  TEACHER_OFFICE_FAX: process.env.NEXT_PUBLIC_TEACHER_OFFICE_FAX,
} as const;
