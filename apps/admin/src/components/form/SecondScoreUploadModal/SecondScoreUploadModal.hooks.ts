import { useToast } from '@maru/hooks';
import { useUploadSecondScoreFormatMutation } from '@/services/form/mutations';
import { useExportSecondScoreFormatQuery } from '@/services/form/queries';
import { downloadBlob } from '@/utils';

export const useExportExcelAction = () => {
  const { toast } = useToast();
  const { refetch: fetchSecondScoreFormat, isFetching: isExportingSecondScoreFormat } =
    useExportSecondScoreFormatQuery();

  const handleExportSecondScoreFormatButtonClick = async () => {
    if (isExportingSecondScoreFormat) return;

    const { data, isError } = await fetchSecondScoreFormat();

    if (isError || !data) {
      toast('면접 전형 점수 양식 다운로드에 실패했습니다.', 'ERROR');
      return;
    }

    downloadBlob(new Blob([data]), '면접 전형 점수 양식.xlsx');
  };

  return { handleExportSecondScoreFormatButtonClick, isExportingSecondScoreFormat };
};

export const useUploadSecondScoreFormatAction = (
  fileData: File | null,
  handleCloseModal: () => void,
) => {
  const { uploadSecondScoreFormat } =
    useUploadSecondScoreFormatMutation(handleCloseModal);

  const handleUploadSecondScoreFormatButtonClick = () => {
    if (!fileData) return;

    const formData = new FormData();
    formData.append('xlsx', fileData);
    uploadSecondScoreFormat(formData);
  };

  return { handleUploadSecondScoreFormatButtonClick };
};
