import { useFairExportExcelQuery } from '@/services/fair/queries';
import { useDeleteFairAttendeeMutation } from '@/services/fair/mutations';
import { useToast } from '@maru/hooks';

export const useExportExcelAction = (id: number) => {
  const { data: exportExcelData } = useFairExportExcelQuery(id);

  const handleExportExcelButtonClick = (title: string) => {
    if (!exportExcelData) return;
    const excelUrl = window.URL.createObjectURL(new Blob([exportExcelData]));

    const link = document.createElement('a');
    link.href = excelUrl;
    const sanitizedTitle = title.replace(/\s+/g, '_');
    link.download = `${sanitizedTitle}_입학설명회_신청자_명단.xlsx`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(excelUrl);
  };

  return { handleExportExcelButtonClick };
};

export const useDeleteFairAttendeeActions = (fairId: number) => {
  const [isDeleteFairAttendeeEditing, setIsDeleteFairAttendeeEditing] = useAtom(
    isDeleteFairAttendeeEditingAtom
  );
  const setDeleteFairAttendee = useSetAtom(deleteFairAttendeeAtom);
  const fairAttendeeResult = useAtomValue(deleteFairAttendeeAtom);
  const { toast } = useToast();

  const setIsDeleteFairAttendeeEditingTrue = () => setIsDeleteFairAttendeeEditing(true);
  const setIsDeleteFairAttendeeEditingFalse = () => {
    setIsDeleteFairAttendeeEditing(false);
    setDeleteFairAttendee({});
  };

  const { deleteFairAttendeeResult } = useDeleteFairAttendeeMutation(fairId);

  const handleDeleteFairAttendeeEditCompleteButtonClick = () => {
    const attendeeList = Object.entries(fairAttendeeResult)
      .filter(([, isSelected]) => isSelected)
      .map(([attendeeId]) => ({
        attendeeId: Number(attendeeId),
      }));

    if (attendeeList.length === 0) {
      toast('삭제할 인원을 선택해주세요.', 'ERROR');
      return;
    }

    deleteFairAttendeeResult({ attendeeList });
  };

  return {
    isDeleteFairAttendeeEditing,
    setIsDeleteFairAttendeeEditingTrue,
    setIsDeleteFairAttendeeEditingFalse,
    handleDeleteFairAttendeeEditCompleteButtonClick,
  };
};

import {
  deleteFairAttendeeAtom,
  fairListSortingTypeAtom,
  fairListTypeAtom,
  isDeleteFairAttendeeEditingAtom,
} from '@/store';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';

export const useFairPageState = () => {
  const [fairListType, setFairListType] = useAtom(fairListTypeAtom);
  const [fairListSortingType, setFairListSortingType] = useAtom(fairListSortingTypeAtom);

  const handleCriteriaChange = (value: string) => {
    if (value === 'none') {
      setFairListType('모두 보기');
      setFairListSortingType({ sort: null });
    } else if (value === 'name_asc') {
      setFairListType('이름 오름차순');
      setFairListSortingType({ sort: 'name_asc' });
    } else if (value === 'school_name_asc') {
      setFairListType('학교명 오름차순');
      setFairListSortingType({ sort: 'school_name_asc' });
    } else if (value === 'grade_asc') {
      setFairListType('학년 오름차순');
      setFairListSortingType({ sort: 'grade_asc' });
    }
  };
  const getCriteriaDropdownValue = (
    _key: 'sort',
    category: Record<string, string>
  ): string | undefined => {
    const sortValue = fairListSortingType.sort;
    if (!sortValue) return undefined;
    return category[sortValue];
  };

  return {
    fairListType,
    handleCriteriaChange,
    getCriteriaDropdownValue,
  };
};
