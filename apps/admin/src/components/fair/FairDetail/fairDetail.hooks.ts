import { useFairExportExcelQuery } from '@/services/fair/queries';
import { useIsDeleteFairAttendeeEditingStore } from '@/store/fair/isDeleteFairParticipantEditing';
import {
  useDeleteFairAttendeeValueStore,
  useSetDeleteFairAttendeeStore,
} from '@/store/fair/deleteFairAttendee';
import { useDeleteFairAttendeeMutation } from '@/services/fair/mutations';
import { toast } from 'react-toastify';

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
  const [isDeleteFairAttendeeEditing, setIsDeleteFairAttendeeEditing] =
    useIsDeleteFairAttendeeEditingStore();
  const setDeleteFairAttendee = useSetDeleteFairAttendeeStore();
  const fairAttendeeResult = useDeleteFairAttendeeValueStore();

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
      toast.error('삭제할 인원을 선택해주세요.');
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

import { useFairListSortingTypeStore, useFairListTypeStore } from '@/store';

export const useFairPageState = () => {
  const [fairListType, setFairListType] = useFairListTypeStore();
  const [fairListSortingType, setFairListSortingType] = useFairListSortingTypeStore();

  const handleCriteriaChange = (value: string) => {
    if (value === 'none') {
      setFairListType('모두 보기');
      setFairListSortingType({ sort: null });
    } else if (value === 'name_asc') {
      setFairListType('이름 오름차순');
      setFairListSortingType({ sort: 'name_asc' });
    } else if (value === 'name_desc') {
      setFairListType('이름 내림차순');
      setFairListSortingType({ sort: 'name_desc' });
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
