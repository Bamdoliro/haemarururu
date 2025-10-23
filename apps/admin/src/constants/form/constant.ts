import type {
  ExportExcelType,
  FormSort,
  FormStatus,
  FormType,
  GraduationType,
  ReceiveStatusValue,
} from '@/types/form/client';
import { color } from '@maru/design-system';

export const FORM_STATUS_CATEGORY: Record<FormStatus, string> = {
  APPROVED: '접수',
  FIRST_FAILED: '면접 불합격',
  FAILED: '불합격',
  FINAL_SUBMITTED: '최종 제출',
  SUBMITTED: '제출',
  RECEIVED: '승인',
  NO_SHOW: '불참',
  FIRST_PASSED: '면접 합격',
  PASSED: '최종 합격',
  REJECTED: '반려',
  ENTERED: '입학',
} as const;

export const FORM_TYPE_CATEGORY: Record<FormType, string> = {
  REGULAR: '일반전형',
  SOCIAL_INTEGRATION: '사회통합전형',
  NATIONAL_VETERANS: '국가보훈대상자',
  NATIONAL_BASIC_LIVING: '국민기초생활수급권자',
  ONE_PARENT: '한부모가족 보호대상자',
  NEAR_POVERTY: '차상위계층',
  LOWER_MIDDLE: '차차상위계층',
  PRINCIPAL_RECOMMENDATION: '학교장 추천',
  SUPERINTENDENT_RECOMMENDATION: '교육감추천',
  MULTICULTURAL: '다문화가족자녀',
  FROM_NORTH_KOREA: '북한이탈청소년',
  SPECIAL_EDUCATION_STUDENT: '특수교육대상자',
  CHILD_WELFARE_FACILITY: '아동복지시설 보호학생',
  TEEN_HOUSEHOLDER: '소년·소녀 가장',
  GRANDFAMILY: '조손 가정 자녀',
  DISABLED_PARENT: '장애인의 자녀',
  FALLEN_HERO: '순직 군경·소방관 등 자녀',
  MULTI_CHILDREN: '다자녀가정 자녀',
  NON_STATUTORY_ONE_PARENT: '한부모가족 자녀(비법정)',
  WELFARE_FACILITY_WORKER: '복지시설 운영자·종사자 자녀 ',
  PUBLIC_SERVANT: '경찰·군인·소방공무원 자녀',
  STREET_CLEANER: '환경미화원 자녀',
  DEPLOYED_SOLDIER: '해외 파병 군인 자녀',
  POSTMAN: '우편집배원 자녀',
  INTANGIBLE_CULTURAL_HERITAGE: '무형 문화재 보유자 자녀',
  SAILOR: '선원 자녀',
  SPECIAL_ADMISSION: '특례입학대상자전형',
  NATIONAL_VETERANS_EDUCATION: '교육지원대상자 전형',
} as const;

export const RECEIVED_STATUS_LIST: {
  name: string;
  value: ReceiveStatusValue;
  color: string;
  backgroundColor: string;
}[] = [
  {
    name: '승인',
    value: 'approve',
    color: color.maruDefault,
    backgroundColor: color.maruLightBlue,
  },
  { name: '반려', value: 'reject', color: color.red, backgroundColor: color.lightRed },
  {
    name: '확인 중',
    value: 'receive',
    color: color.green,
    backgroundColor: color.lightGreen,
  },
];

export const FORM_SORTING_CATEGORY: Record<FormSort, string> = {
  'total-score-desc': '최종 점수 높은 순',
  'total-score-asc': '최종 점수 낮은 순',
  'form-id': '접수순',
} as const;

export const EXPORT_EXCEL_TYPE_VALUE: Record<ExportExcelType, string> = {
  '전체 내보내기': 'result',
  '1차 전형 결과': 'first-round',
  '2차 전형 결과': 'second-round',
  '최종 합격자': 'final-passed',
} as const;

export const EXPORT_EXCEL_TYPE = [
  '전체 내보내기',
  '1차 전형 결과',
  '2차 전형 결과',
  '최종 합격자',
] as const;

export const FORM_DETAIL_FIELDS = [
  '지원자 정보',
  '보호자 정보',
  '출신학교 및 학력',
  '전형',
  '성적',
  '자기소개서',
] as const;

export const GRADUATION_TYPE_VALUE: Record<GraduationType, string> = {
  QUALIFICATION_EXAMINATION: '검정고시',
  EXPECTED: '졸업 예정',
  GRADUATED: '졸업',
} as const;

export const GRADES_FIELDS = ['교과 성적', '출결 상황'] as const;

export const GRADES_QUALIFICATION_EXAMINATION_FIELDS = ['교과 성적'] as const;
