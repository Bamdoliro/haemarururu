export interface ScheduleDateTimes {
  applicationFormStart: string;
  visitSubmissionAt: string;
  applicationFormEnd: string;
  selectFirstPassAt: string;
  announcementOfFirstPass: string;
  interviewStart: string;
  interviewEnd: string;
  announcementOfFinalPass: string;
  registrationStart: string;
  registrationEnd: string;
  admissionAndPledgeStart: string;
  admissionAndPledgeEnd: string;
  attendanceStandardDate: string;
  maintenanceStart: string | null;
  maintenanceEnd: string | null;
}

export type ScheduleKey = keyof ScheduleDateTimes;

export interface Schedule extends ScheduleDateTimes {
  id: number;
  admissionYear: number;
  active: boolean;
  version: number;
  updatedAt: string;
}

export type ScheduleInput = Record<ScheduleKey, string>;

export type ScheduleError = Partial<Record<ScheduleKey, string>>;
