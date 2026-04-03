import {
  usePostNoticeMutation,
  useNoticeFileUrlMutation,
} from '@/services/notice/mutations';
import type { NoticeInput } from '@/types/notice/client';
import { useState } from 'react';
import type { ChangeEventHandler } from 'react';
import { useNoticeFileStore } from '@/store';

export const useNoticeCreateData = () => {
  const [noticeData, setNoticeData] = useState<NoticeInput>({
    title: '',
    content: '',
    fileNameList: [],
  });

  const handleNoticeDataChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setNoticeData((prev) => ({ ...prev, [name]: value }));
  };

  const handleContentChange = (value: string) => {
    setNoticeData((prev) => ({ ...prev, content: value }));
  };

  return {
    noticeData,
    setNoticeData,
    handleNoticeDataChange,
    handleContentChange,
  };
};

export const useNoticeCreateAction = (noticeData: NoticeInput) => {
  const { postNoticeMutate } = usePostNoticeMutation();
  const { noticeFileUrlMutate } = useNoticeFileUrlMutation();
  const [fileData, setFileData] = useNoticeFileStore();

  const handleNoticeCreateButtonClick = async () => {
    let fileNameList: string[] | null = noticeData.fileNameList?.length
      ? noticeData.fileNameList
      : null;

    if (fileData?.length) {
      const uploadedFiles = await noticeFileUrlMutate(fileData);
      fileNameList = uploadedFiles.length ? uploadedFiles.map((f) => f.fileName) : null;
    }

    postNoticeMutate(
      { ...noticeData, fileNameList },
      { onSuccess: () => setFileData([]) }
    );
  };

  return { handleNoticeCreateButtonClick };
};
