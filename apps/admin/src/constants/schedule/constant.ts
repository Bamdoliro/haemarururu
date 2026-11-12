import type { ScheduleKey } from '@/types/schedule/client';

interface ScheduleField {
  key: ScheduleKey;
  label: string;
  type: 'datetime-local' | 'date';
  optional?: boolean;
}

interface ScheduleOrderRule {
  before: ScheduleKey;
  after: ScheduleKey;
  allowEqual?: boolean;
}

export const SCHEDULE_FIELDS: ScheduleField[] = [
  { key: 'applicationFormStart', label: '원서 접수 시작', type: 'datetime-local' },
  { key: 'visitSubmissionAt', label: '방문 원서 접수', type: 'datetime-local' },
  { key: 'applicationFormEnd', label: '원서 접수 마감', type: 'datetime-local' },
  { key: 'selectFirstPassAt', label: '1차 선발 실행', type: 'datetime-local' },
  { key: 'announcementOfFirstPass', label: '1차 합격 발표', type: 'datetime-local' },
  { key: 'interviewStart', label: '2차 면접 시작', type: 'datetime-local' },
  { key: 'interviewEnd', label: '2차 면접 종료', type: 'datetime-local' },
  { key: 'announcementOfFinalPass', label: '최종 합격 발표', type: 'datetime-local' },
  { key: 'registrationStart', label: '입학 등록 시작', type: 'datetime-local' },
  { key: 'registrationEnd', label: '입학 등록 마감', type: 'datetime-local' },
  {
    key: 'admissionAndPledgeStart',
    label: '입학 등록원·서약서 제출 시작',
    type: 'datetime-local',
  },
  {
    key: 'admissionAndPledgeEnd',
    label: '입학 등록원·서약서 제출 마감',
    type: 'datetime-local',
  },
  { key: 'attendanceStandardDate', label: '출결 기준일', type: 'date' },
  {
    key: 'maintenanceStart',
    label: '점검 시작',
    type: 'datetime-local',
    optional: true,
  },
  { key: 'maintenanceEnd', label: '점검 종료', type: 'datetime-local', optional: true },
];

export const SCHEDULE_ORDER_RULES: ScheduleOrderRule[] = [
  { before: 'applicationFormStart', after: 'visitSubmissionAt', allowEqual: true },
  { before: 'visitSubmissionAt', after: 'applicationFormEnd' },
  { before: 'applicationFormEnd', after: 'selectFirstPassAt' },
  { before: 'selectFirstPassAt', after: 'announcementOfFirstPass', allowEqual: true },
  { before: 'announcementOfFirstPass', after: 'interviewStart' },
  { before: 'interviewStart', after: 'interviewEnd' },
  { before: 'interviewEnd', after: 'announcementOfFinalPass' },
  { before: 'announcementOfFinalPass', after: 'registrationStart' },
  { before: 'registrationStart', after: 'registrationEnd' },
  { before: 'registrationStart', after: 'admissionAndPledgeStart', allowEqual: true },
  { before: 'admissionAndPledgeStart', after: 'admissionAndPledgeEnd' },
  { before: 'maintenanceStart', after: 'maintenanceEnd' },
];

export const SCHEDULE_INPUT_MAX = {
  'datetime-local': '9999-12-31T23:59',
  date: '9999-12-31',
} as const;
