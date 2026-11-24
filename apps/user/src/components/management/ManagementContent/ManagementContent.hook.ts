import { ROUTES } from '@/constants/common/constants';
import { useNow, useUser } from '@/hooks';
import { useExportFormQuery } from '@/services/form/queries';
import { useDownloadAdmissionTicketQuery } from '@/services/result/queries';
import { useSchedule } from '@/services/schedule/queries';
import { downloadFile, formatResultDateTime } from '@/utils';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { useRouter } from 'next/navigation';

dayjs.extend(isBetween);

export const useBoxClick = (status?: string) => {
  const router = useRouter();
  const { userData } = useUser();
  const schedule = useSchedule();
  const now = useNow([schedule.방문_원서_접수, schedule.원서_접수_마감]);

  const checkFormExportPeriod = (time: Dayjs) =>
    time.isBetween(schedule.방문_원서_접수, schedule.원서_접수_마감, null, '[)');

  const getFormExportGuide = (time: Dayjs) =>
    time.isBefore(schedule.방문_원서_접수)
      ? `원서 출력은 ${formatResultDateTime(schedule.방문_원서_접수)}부터 가능합니다.`
      : '원서 접수 기간이 마감되어 원서를 출력할 수 없습니다.';

  const isFormExportPeriod = checkFormExportPeriod(now);
  const formExportGuide = getFormExportGuide(now);
  const { data: exportFormData } = useExportFormQuery();
  const { data: admissionTicketData } = useDownloadAdmissionTicketQuery();

  const handleWriteFormContinue = () => {
    const banStatus =
      status === 'APPROVED' ||
      status === 'FINAL_SUBMITTED' ||
      status === 'PASSED' ||
      status === 'RECEIVED' ||
      status === 'FIRST_PASSED' ||
      status === 'FAILED' ||
      status === 'FIRST_FAILED' ||
      status === 'NO_SHOW' ||
      status === 'ENTERED';

    if (banStatus) {
      alert('원서를 제출한 상태입니다.');
    } else {
      router.push(ROUTES.FORM);
    }
  };

  const handleDownloadForm = () => {
    const current = dayjs();
    if (!checkFormExportPeriod(current)) {
      alert(getFormExportGuide(current));
      return;
    }

    const accept = ['SUBMITTED', 'FINAL_SUBMITTED', 'APPROVED', 'RECEIVED', 'REJECTED'];

    if (!status || !accept.includes(status)) {
      alert('원서를 제출하지 않아, 다운로드 할 수 없습니다.');
      return;
    }

    if (!exportFormData) {
      alert('원서를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.');
      return;
    }

    downloadFile(exportFormData, `${userData.name} 해운대고등학교 원서.pdf`);
  };

  const handleDownloadAdmissionTicket = () => {
    if (!(status === 'FIRST_PASSED')) {
      alert('1차 합격일때만 수험표를 출력할 수 있습니다.');
    } else {
      downloadFile(admissionTicketData, `${userData.name} 수험표.pdf`);
    }
  };

  return {
    isFormExportPeriod,
    formExportGuide,
    handleWriteFormContinue,
    handleDownloadForm,
    handleDownloadAdmissionTicket,
  };
};
