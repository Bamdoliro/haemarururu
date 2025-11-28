export const DROPDOWN_DATA = [
  { value: 'RECEIVED', label: '원서 승인 완료자' },
  { value: 'REJECTED', label: '원서 반려자' },
  {
    value: 'FIRST_PASSED',
    label: '1차 합격자',
    children: [
      { value: 'SOCIAL_INTEGRATION', label: '사회통합전형' },
      { value: 'REGULAR', label: '일반전형' },
      { value: 'FIRST_PASSED', label: '전체 1차 합격자' },
    ],
  },
  { value: 'PASSED', label: '최종 합격자' },
];

export const MESSAGE_STATUS_VALUES = [
  'FINAL_SUBMITTED',
  'RECEIVED',
  'REJECTED',
  'FIRST_PASSED',
  'PASSED',
];
