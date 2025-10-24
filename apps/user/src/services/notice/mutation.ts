import { useMutation } from '@tanstack/react-query';
import { getAdmissionGuidelineFile } from '@/services/notice/api';
import { downloadFile } from '@/utils';

export const useGetAdmissionGuidelineFileMutation = () => {
  const { mutate: getAdmissionGuidelineFileMutate, ...restMutation } = useMutation({
    mutationFn: () => {
      return getAdmissionGuidelineFile();
    },
    onSuccess: (data) => {
      const downloadUrl = data.data.downloadUrl;
      downloadFile(downloadUrl, '해운대고등학교_입학전형.pdf');
    },
  });

  return { getAdmissionGuidelineFileMutate, ...restMutation };
};
