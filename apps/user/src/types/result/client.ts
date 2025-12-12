export interface Result {
  id: number;
  name: string;
  type: string;
  interviewNumber: string | null;
  changedToRegular: boolean;
  passed: boolean;
}

export type ResultStep = 'MAIN' | 'RESULT';
