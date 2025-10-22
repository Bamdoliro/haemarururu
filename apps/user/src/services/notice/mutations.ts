import { useMutation } from '@tanstack/react-query';
import { getAdmissionGuidelineFile } from '@/services/notice/api';

export const useGetAdmissionGuidelineFileMutation = () => {
  const { mutate: getAdmissionGuidelineFileMutate, ...restMutation } = useMutation({
    mutationFn: async () => {
      return await getAdmissionGuidelineFile();
    },
    onSuccess: (downloadUrl) => {
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = '해운대고등학교_입학전형요강.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
  });

  return { getAdmissionGuidelineFileMutate, ...restMutation };
};
