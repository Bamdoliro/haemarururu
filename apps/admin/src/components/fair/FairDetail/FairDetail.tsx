import type { FairStatus, StatusType } from '@/types/fair/client';
import { flex } from '@maru/utils';
import { color } from '@maru/design-system';
import { styled } from 'styled-components';
import { Column, Row, Text, Button, Dropdown } from '@maru/ui';
import { FunctionDropdown } from '@/components/common';
import { IconDelete, IconEditDocument, IconUpload } from '@maru/icon';
import FairTable from '../FairTable/FairTable';
import { useFairDetailQuery } from '@/services/fair/queries';
import { formatDate } from '@/utils';
import { FAIR_ITEM_STATUS, FAIR_SORT_TYPE, FAIR_STATUS } from '@/constants/fair/constant';
import {
  useDeleteFairAttendeeActions,
  useExportExcelAction,
  useFairPageState,
} from './fairDetail.hooks';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/common/constant';
import { useFairListSortingTypeValueStore } from '@/store/fair/fairSortType';

interface FairDetailProps {
  id: number;
}

const FairDetail = ({ id }: FairDetailProps) => {
  const { handleCriteriaChange, getCriteriaDropdownValue } = useFairPageState();
  const fairListSortingType = useFairListSortingTypeValueStore();

  const { data: FairDetailData } = useFairDetailQuery(id, fairListSortingType.sort);

  const { handleExportExcelButtonClick } = useExportExcelAction(id);
  const {
    isDeleteFairAttendeeEditing,
    setIsDeleteFairAttendeeEditingTrue,
    setIsDeleteFairAttendeeEditingFalse,
    handleDeleteFairAttendeeEditCompleteButtonClick,
  } = useDeleteFairAttendeeActions(id);
  const router = useRouter();

  const statusType: StatusType =
    FAIR_ITEM_STATUS[FairDetailData?.status as FairStatus] ?? 'open';

  const Fairtitle = formatDate.toDayAndDateTime(FairDetailData?.start || '');
  const FairAttendeeList = FairDetailData?.attendeeList;

  const handleFairEditButtonClick = () => {
    router.push(`${ROUTES.FAIR_EDIT}/${id}`);
  };

  return FairDetailData ? (
    <StyledFairDetail>
      <Column gap={4}>
        <ItemStatusBox status={statusType}>
          {FAIR_STATUS[FairDetailData.status as FairStatus]}
        </ItemStatusBox>
        <Text fontType="H1">
          {Fairtitle}
          <br />
          입학전형 설명회 조회
        </Text>
      </Column>
      <Row justifyContent="space-between" width="100%">
        <Dropdown
          data={[
            { label: '초기화', value: 'none' },
            { label: '이름 오름차순', value: 'name_asc' },
            { label: '이름 내림차순', value: 'name_desc' },
          ]}
          size="SMALL"
          width={160}
          placeholder="정렬 기준"
          value={getCriteriaDropdownValue('sort', FAIR_SORT_TYPE)}
          onChange={handleCriteriaChange}
          name="sort"
        />
        {isDeleteFairAttendeeEditing ? (
          <Row gap={12}>
            <Button styleType="SECONDARY" onClick={setIsDeleteFairAttendeeEditingFalse}>
              취소
            </Button>
            <Button
              styleType="PRIMARY"
              onClick={handleDeleteFairAttendeeEditCompleteButtonClick}
            >
              완료
            </Button>
          </Row>
        ) : (
          <FunctionDropdown
            data={[
              {
                icon: <IconUpload color="gray600" width={24} height={24} />,
                label: '명단 엑셀로 내보내기',
                value: 'excel',
                onClick: () => {
                  handleExportExcelButtonClick(Fairtitle);
                },
              },
              {
                icon: <IconEditDocument width={24} height={24} />,
                label: '입학설명회 수정하기',
                value: 'fair_edit',
                onClick: handleFairEditButtonClick,
              },
              {
                icon: <IconDelete width={24} height={24} />,
                label: '인원 삭제하기',
                value: 'fair_delete',
                onClick: setIsDeleteFairAttendeeEditingTrue,
              },
            ]}
          />
        )}
      </Row>
      <FairTable dataList={FairAttendeeList ?? []} />
    </StyledFairDetail>
  ) : null;
};

export default FairDetail;

const StyledFairDetail = styled.div`
  ${flex({ flexDirection: 'column' })}
  width: 100%;
  gap: 36px;
`;

const ItemStatusBox = styled.div<{ status: StatusType }>`
  ${flex({ justifyContent: 'center', alignItems: 'center' })}
  display: inline-flex;
  width: max-content;
  height: 32px;
  padding: 0 10px;
  gap: 10px;
  border-radius: 100px;
  ${({ status }) => {
    switch (status) {
      case 'open':
        return `
          color: ${color.haeMaruDefault};
          border: 1px solid ${color.haeMaruDefault};
          background: rgba(37, 124, 255, 0.10);
        `;
      case 'closed':
        return `
          color: ${color.red};
          border: 1px solid ${color.red};
          background: rgba(244, 67, 54, 0.10);
        `;
      case 'full':
        return `
          color: ${color.gray700};
          border: 1px solid ${color.gray700};
          background: rgba(89, 91, 102, 0.10);
        `;
      default:
        return '';
    }
  }}
`;
