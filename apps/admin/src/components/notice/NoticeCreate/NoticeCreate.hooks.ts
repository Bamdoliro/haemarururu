import {
  usePostNoticeMutation,
  useNoticeFileUrlMutation,
} from '@/services/notice/mutations';
import { useNoticeFileStore } from '@/store/notice/noticeFile';
import type { NoticeInput } from '@/types/notice/client';
import { resizeTextarea } from '@/utils';
import { useEffect, useRef, useState } from 'react';
import type { ChangeEventHandler } from 'react';

export const useNoticeCreateData = () => {
  const contentTextareaRef = useRef<HTMLTextAreaElement>(null);
  const [noticeData, setNoticeData] = useState<NoticeInput>({
    title: '',
    content: '',
    fileNameList: [],
  });

  const handleNoticeDataChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    const { name, value } = e.target;
    setNoticeData((prev) => ({ ...prev, [name]: value }));

    if (name === 'content') {
      resizeTextarea(contentTextareaRef);
    }
  };

  useEffect(() => resizeTextarea(contentTextareaRef), []);

  return {
    noticeData,
    setNoticeData,
    contentTextareaRef,
    handleNoticeDataChange,
  };
};

export const useNoticeCreateAction = (noticeData: NoticeInput) => {
  const { postNoticeMutate } = usePostNoticeMutation();
  const { noticeFileUrlMutateAsync } = useNoticeFileUrlMutation();
  const [fileData, setFileData] = useNoticeFileStore();

  const handleNoticeCreateButtonClick = async () => {
    let fileNameList = noticeData.fileNameList ?? [];

    if (fileData?.length) {
      const uploadedFiles = await noticeFileUrlMutateAsync(fileData);
      fileNameList = uploadedFiles.map((f) => f.fileName);
    }

    postNoticeMutate(
      { ...noticeData, fileNameList },
      { onSuccess: () => setFileData([]) }
    );
  };

  return { handleNoticeCreateButtonClick };
};
