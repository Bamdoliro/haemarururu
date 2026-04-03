import {
  useNoticeFileUrlMutation,
  usePutNoticeMutation,
} from '@/services/notice/mutations';
import type { NoticeInput } from '@/types/notice/client';
import { useState, useEffect } from 'react';
import type { ChangeEventHandler } from 'react';
import { useNoticeDetailQuery } from '@/services/notice/queries';
import { useNoticeFileStore } from '@/store';

export const useNoticeEditData = (id: number) => {
  const { data: noticeDetailData } = useNoticeDetailQuery(id);

  const [noticeData, setNoticeData] = useState<NoticeInput>({
    title: '',
    content: '',
    fileNameList: [],
  });
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (noticeDetailData) {
      setNoticeData({
        title: noticeDetailData.title,
        content: noticeDetailData.content,
        fileNameList: noticeDetailData.fileList?.map((file) => file.fileName) ?? [],
      });
      setIsInitialized(true);
    }
  }, [noticeDetailData]);

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
    isInitialized,
    handleNoticeDataChange,
    handleContentChange,
  };
};

export const useNoticeEditAction = (id: number, noticeData: NoticeInput) => {
  const { putNoticeMutate } = usePutNoticeMutation(id);
  const { noticeFileUrlMutate } = useNoticeFileUrlMutation();
  const [fileData, setFileData] = useNoticeFileStore();

  const handleNoticeEditButtonClick = async () => {
    const fileNameList = noticeData.fileNameList ?? [];

    if (fileData?.length) {
      await noticeFileUrlMutate(fileData);
    }

    putNoticeMutate(
      { ...noticeData, fileNameList },
      { onSuccess: () => setFileData([]) }
    );
  };

  return { handleNoticeEditButtonClick };
};
