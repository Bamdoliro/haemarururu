export const ANALYSIS_TYPE = [
  '지원자 수 (경쟁률)',
  '성적 분포',
  '지원 전형 비율',
  '출신 학교 현황',
] as const;

export const ANALYSIS_STEP = ['변경 전', '변경 후'] as const;

export const ANALYSIS_PASS_STEP = [
  '전체 조회',
  '1차 합격자',
  '2차 전형자',
  '최종 합격자',
] as const;

export const ANALYSIS_RATIO_TYPE = [
  '일반 전형 성비',
  '사회 다양성 전형 성비',
  '정원 외 전형',
] as const;
