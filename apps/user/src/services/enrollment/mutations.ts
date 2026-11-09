import { useMutation, useQueryClient } from '@tanstack/react-query';
import { KEY } from '@/constants/common/constants';
import { patchEnter, postEntrollmentDocument, putEntrollmentDocument } from './api';
import type { FileDocument } from '@/types/enrollment/client';

export const useChangeEnterMutation = () => {
  const queryClient = useQueryClient();

  const { mutate: enterMutate, ...restMutation } = useMutation({
    mutationFn: () => patchEnter(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [KEY.FORM_STATUS] });
      alert('입학등록원이 제출되었습니다.');
    },
  });

  return { enterMutate, ...restMutation };
};

export const usePutDocumentImageMutation = (file: File | null) => {
  const { enterMutate } = useChangeEnterMutation();

  const { mutate: documentMutate, ...restMutation } = useMutation({
    mutationFn: (url: string) => putEntrollmentDocument(file, url),
    onSuccess: () => {
      enterMutate();
    },
  });

  return { documentMutate, ...restMutation };
};

export const useUploadDocumentMutation = (fileData: FileDocument, file: File | null) => {
  const { documentMutate } = usePutDocumentImageMutation(file);

  const { mutate: uploadProfileMutate, ...restMutation } = useMutation({
    mutationFn: () => postEntrollmentDocument(fileData),
    onSuccess: (res) => {
      const { uploadUrl } = res.data;
      documentMutate(uploadUrl);
    },
  });

  return { uploadProfileMutate, ...restMutation };
};
