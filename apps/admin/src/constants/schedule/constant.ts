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
  { key: 'announcementOfFirstPass', label: '1차 합격 발표', type: 'datetime-local' },
  { key: 'interviewStart', label: '2차 면접 시작', type: 'datetime-local' },
  { key: 'interviewEnd', label: '2차 면접 종료', type: 'datetime-local' },
  { key: 'announcementOfFinalPass', label: '최종 합격 발표', type: 'datetime-local' },
  { key: 'registrationStart', label: '입학 등록 시작', type: 'datetime-local' },
  { key: 'registrationEnd', label: '입학 등록 마감', type: 'datetime-local' },
  { key: 'attendanceStandardDate', label: '출결 기준일', type: 'date' },
  {
    key: 'maintenanceStart',
    label: '점검 시작',
    type: 'datetime-local',
    optional: true,
  },
  { key: 'maintenanceEnd', label: '점검 종료', type: 'datetime-local', optional: true },
];

// 서버(AdmissionSchedule.validate)의 시간 순서 검증과 동일하게 맞춘다.
export const SCHEDULE_ORDER_RULES: ScheduleOrderRule[] = [
  { before: 'applicationFormStart', after: 'visitSubmissionAt', allowEqual: true },
  { before: 'visitSubmissionAt', after: 'applicationFormEnd' },
  { before: 'applicationFormEnd', after: 'announcementOfFirstPass' },
  { before: 'announcementOfFirstPass', after: 'interviewStart' },
  { before: 'interviewStart', after: 'interviewEnd' },
  { before: 'interviewEnd', after: 'announcementOfFinalPass' },
  { before: 'announcementOfFinalPass', after: 'registrationStart' },
  { before: 'registrationStart', after: 'registrationEnd' },
  { before: 'maintenanceStart', after: 'maintenanceEnd' },
];

// 네이티브 날짜 입력에서 6자리 연도가 입력되는 것을 막는다.
export const SCHEDULE_INPUT_MAX = {
  'datetime-local': '9999-12-31T23:59',
  date: '9999-12-31',
} as const;
