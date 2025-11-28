import type { FairSort, FairStatus, StatusType } from '@/types/fair/client';

export const FAIR_STATUS: Record<FairStatus, string> = {
  APPLICATION_ENDED: '신청 종료',
  CLOSED: '마감',
  APPLICATION_IN_PROGRESS: '신청 가능',
  APPLICATION_NOT_STARTED: '신청 시작 전',
  APPLICATION_EARLY_CLOSED: '조기 마감',
} as const;

export const FAIR_TAP_STATUS: Record<string, string[]> = {
  '진행 중인 신청': [
    'APPLICATION_IN_PROGRESS',
    'APPLICATION_NOT_STARTED',
    'APPLICATION_ENDED',
  ],
  '마감된 신청': ['CLOSED', 'APPLICATION_EARLY_CLOSED'],
};

export const FAIR_ITEM_STATUS: Record<FairStatus, StatusType> = {
  APPLICATION_ENDED: 'full',
  CLOSED: 'closed',
  APPLICATION_EARLY_CLOSED: 'closed',
  APPLICATION_IN_PROGRESS: 'open',
  APPLICATION_NOT_STARTED: 'open',
};

export const FAIR_SORT_TYPE: Record<FairSort, string> = {
  none: '초기화',
  name_asc: '이름 오름차순',
  name_desc: '이름 내림차순',
};
