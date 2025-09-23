export type RecipientType =
  | 'FINAL_SUBMITTED'
  | 'RECEIVED'
  | 'REJECTED'
  | 'FIRST_PASSED'
  | 'SOCIAL_INTEGRATION'
  | 'REGULAR'
  | 'PASSED';

export interface MessageForm {
  title: string;
  recipient: RecipientType;
  content: string;
}
