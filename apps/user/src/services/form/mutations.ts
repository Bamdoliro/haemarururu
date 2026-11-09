import { useApiError } from '@/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getUploadProfile,
  patchSubmitFinalForm,
  postFormDocument,
  postSaveForm,
  postSubmitDraftFrom,
  postUploadProfileImage,
  putFormCorrection,
  putProfileUpoload,
  putUploadForm,
} from './api';
import type { Form } from '@/types/form/client';
import { KEY } from '@/constants/common/constants';
import { formStepAtom, formProfileAtom } from '@/stores';
import type { FileDocument, GetSaveFormRes } from '@/types/form/remote';
import { useToast } from '@maru/hooks';
import { useSetAtom } from 'jotai';

export const useSaveFormMutation = () => {
  const { handleError } = useApiError();
  const queryClient = useQueryClient();

  const { mutate: saveFormMutate, ...restMutation } = useMutation({
    mutationFn: (form: Form) => postSaveForm(form),
    onSuccess: (_, form) => {
      queryClient.setQueryData<GetSaveFormRes>([KEY.SAVE_FORM], { data: form });
    },
    onError: handleError,
  });

  return { saveFormMutate, ...restMutation };
};

export const useSubmitDraftFormMutation = (formData: Form) => {
  const { handleError } = useApiError();
  const setFormStep = useSetAtom(formStepAtom);
  const queryClient = useQueryClient();
  const { mutate: submitDraftFormMutate, ...restMutation } = useMutation({
    mutationFn: () => postSubmitDraftFrom(formData),
    onSuccess: () => {
      setFormStep('초안제출완료');
      queryClient.invalidateQueries({ queryKey: [KEY.FORM_STATUS] });
      queryClient.invalidateQueries({ queryKey: [KEY.SAVE_FORM] });
    },
    onError: handleError,
  });

  return { submitDraftFormMutate, ...restMutation };
};

export const useSubmitFinalFormMutation = () => {
  const setFormStep = useSetAtom(formStepAtom);
  const { handleError } = useApiError();
  const queryClient = useQueryClient();

  const { mutate: submitFinalFormMutate, ...restMutation } = useMutation({
    mutationFn: () => patchSubmitFinalForm(),
    onSuccess: () => {
      setFormStep('최종제출완료');
      queryClient.invalidateQueries({ queryKey: [KEY.FORM_STATUS] });
    },
    onError: handleError,
  });

  return { submitFinalFormMutate, ...restMutation };
};

export const useCorrectionFormMutation = () => {
  const { handleError } = useApiError();
  const setFormStep = useSetAtom(formStepAtom);
  const queryClient = useQueryClient();

  const { mutate: correctionFormMutate, ...restMutation } = useMutation({
    mutationFn: (formData: Form) => putFormCorrection(formData),
    onSuccess: () => {
      setFormStep('초안제출완료');
      queryClient.invalidateQueries({ queryKey: [KEY.FORM_STATUS] });
      queryClient.invalidateQueries({ queryKey: [KEY.SAVE_FORM] });
    },
    onError: handleError,
  });

  return { correctionFormMutate, ...restMutation };
};

export const UPLOAD_PROFILE_MUTATION_KEY = ['uploadProfile'] as const;

export const useUploadProfileMutation = () => {
  const setFormProfile = useSetAtom(formProfileAtom);
  const { toast } = useToast();

  const { mutate: uploadProfileMutate, ...restMutation } = useMutation({
    mutationKey: UPLOAD_PROFILE_MUTATION_KEY,
    mutationFn: async (file: File) => {
      const res = await postUploadProfileImage({
        fileName: file.name,
        mediaType: file.type,
        fileSize: file.size,
      });
      const { uploadUrl, downloadUrl } = res.data;
      await putProfileUpoload(file, uploadUrl);
      return { uploadUrl, downloadUrl } as { uploadUrl: string; downloadUrl: string };
    },
    onSuccess: ({ uploadUrl, downloadUrl }) => {
      setFormProfile({ uploadUrl, downloadUrl });
    },
    onError: () => {
      toast('증명사진 업로드에 실패했습니다. 다시 시도해 주세요.', 'ERROR');
    },
  });

  return { uploadProfileMutate, ...restMutation };
};

export const useGetRefreshProfileMutation = () => {
  const { mutate: getRefreshProfileMutate, ...restMutation } = useMutation({
    mutationFn: (downloadUrl: string) => getUploadProfile(downloadUrl),
  });

  return { getRefreshProfileMutate, ...restMutation };
};

export const useRefreshProfileMutation = () => {
  const setFormProfile = useSetAtom(formProfileAtom);
  const { getRefreshProfileMutate } = useGetRefreshProfileMutation();

  const { mutate: refreshProfileMutate, ...restMutation } = useMutation({
    mutationFn: (fileData: FileDocument) => postUploadProfileImage(fileData),
    onSuccess: (res) => {
      const { uploadUrl, downloadUrl } = res.data;
      setFormProfile({
        uploadUrl: uploadUrl,
        downloadUrl: downloadUrl,
      });
      getRefreshProfileMutate(downloadUrl);
    },
  });

  return { refreshProfileMutate, ...restMutation };
};

export const usePutFormMutation = (file: File | null) => {
  const { submitFinalFormMutate } = useSubmitFinalFormMutation();

  const { mutate: formMutate, ...restMutation } = useMutation({
    mutationFn: (url: string) => putUploadForm(file, url),
    onSuccess: () => {
      submitFinalFormMutate();
    },
  });

  return { formMutate, ...restMutation };
};

export const useUploadFormMutation = (fileData: FileDocument, file: File | null) => {
  const { formMutate } = usePutFormMutation(file);

  const { mutate: uploadFormMutate, ...restMutation } = useMutation({
    mutationFn: () => postFormDocument(fileData),
    onSuccess: (res) => {
      const { uploadUrl } = res.data;
      formMutate(uploadUrl);
    },
  });

  return { uploadFormMutate, ...restMutation };
};
