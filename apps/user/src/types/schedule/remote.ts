export interface GetCurrentScheduleRes {
  data: {
    id: number;
    admissionYear: number;
    active: boolean;
    version: number;
    applicationFormStart: string;
    visitSubmissionAt: string;
    applicationFormEnd: string;
    announcementOfFirstPass: string;
    interviewStart: string;
    interviewEnd: string;
    announcementOfFinalPass: string;
    registrationStart: string;
    registrationEnd: string;
    attendanceStandardDate: string;
    updatedAt: string;
  };
}
