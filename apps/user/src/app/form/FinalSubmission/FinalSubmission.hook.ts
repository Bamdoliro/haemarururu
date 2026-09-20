import { useUser } from '@/hooks';
import { useUploadFormMutation } from '@/services/form/mutations';
import { useExportFormQuery } from '@/services/form/queries';
import { useFinalFormStore, useFinalFormValueStore } from '@/stores/form/finalForm';
import { downloadFile } from '@/utils';
import { useToast } from '@maru/hooks';
import { useCallback, useEffect, useRef } from 'react';

const EXPORT_FORM_ERROR_MESSAGE =
  '원서 pdf를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.';

export const useCTAButton = (openPdfLoader: () => void, closePdfLoader: () => void) => {
  const { userData } = useUser();
  const { toast } = useToast();
  const {
    data: exportFormData,
    isLoading: isExportFormLoading,
    isError: isExportFormError,
  } = useExportFormQuery();
  const hasDownloadedRef = useRef(false);
  const final = useFinalFormValueStore();
  const { uploadFormMutate } = useUploadFormMutation(
    {
      fileName: final.fileName ?? '',
      mediaType: final.mediaType ?? '',
      fileSize: final.fileSize ?? 0,
    },
    final.file ?? null
  );

  const handleSubmitFinalForm = () => {
    uploadFormMutate();
  };

  const downloadExportForm = useCallback(() => {
    if (!exportFormData) return false;

    downloadFile(exportFormData, `${userData.name} 해운대고등학교 원서접수.pdf`);
    return true;
  }, [exportFormData, userData.name]);

  useEffect(() => {
    if (isExportFormLoading) {
      openPdfLoader();
    } else {
      closePdfLoader();
    }
  }, [isExportFormLoading, openPdfLoader, closePdfLoader]);

  useEffect(() => {
    if (isExportFormError) {
      toast(EXPORT_FORM_ERROR_MESSAGE, 'ERROR');
    }
  }, [isExportFormError, toast]);

  useEffect(() => {
    if (hasDownloadedRef.current) return;

    if (downloadExportForm()) {
      hasDownloadedRef.current = true;
    }
  }, [downloadExportForm]);

  const handleExportForm = useCallback(() => {
    if (!downloadExportForm()) {
      toast(EXPORT_FORM_ERROR_MESSAGE, 'ERROR');
    }
  }, [downloadExportForm, toast]);

  return { handleSubmitFinalForm, handleExportForm };
};

export const useInput = () => {
  const [final, setFinal] = useFinalFormStore();

  const handleFormDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFinal({
      fileName: file.name,
      mediaType: file.type,
      fileSize: file.size,
      file: file,
    });
  };

  return { handleFormDocumentChange, final };
};
