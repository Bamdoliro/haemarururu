import { useNoticeDetailQuery } from '@/services/notice/queries';
import { color, font } from '@maru/design-system';
import { Column, Text } from '@maru/ui';
import { convertLink, flex, formatCreatedAt } from '@maru/utils';
import styled from 'styled-components';
import { useNoticeFile } from './NoticeDetailContent.hook';
import DownloadButton from './DownloadButton/DownloadButton';

interface NoticeDetailContentProps {
  id: number;
}

const NoticeDetailContent = ({ id }: NoticeDetailContentProps) => {
  const { data: noticeDetailData } = useNoticeDetailQuery(id);
  const { handleFileDownload, handleOpenFileWindow } = useNoticeFile();

  return (
    <StyledNoticeDetailContent>
      <NoticeDetailHeader>
        <Text fontType="H3" color={color.gray900}>
          {noticeDetailData?.title}
        </Text>
        <Text fontType="p2" color={color.gray750}>
          {formatCreatedAt(noticeDetailData?.updatedAt ?? '')}
        </Text>
      </NoticeDetailHeader>
      <Column gap={36}>
        <Content
          dangerouslySetInnerHTML={{
            __html: convertLink(noticeDetailData?.content ?? ''),
          }}
        />
        {noticeDetailData?.fileList && (
          <Column gap={12}>
            {noticeDetailData?.fileList?.map((file, index) => (
              <DownloadButton
                key={index}
                fileName={file.fileName}
                buttonClick={() => handleFileDownload(file.downloadUrl, file.fileName)}
                textClick={() => handleOpenFileWindow(file.downloadUrl)}
              />
            ))}
          </Column>
        )}
      </Column>
    </StyledNoticeDetailContent>
  );
};

export default NoticeDetailContent;

const StyledNoticeDetailContent = styled.div`
  ${flex({ flexDirection: 'column' })}
  gap: 24px;
`;

const NoticeDetailHeader = styled.div`
  ${flex({ flexDirection: 'column' })}
  gap: 16px;
  border-bottom: 1px solid ${color.gray300};
  padding-bottom: 8px;
`;

const Content = styled.div`
  ${font.p2}
  color: ${color.gray900};
`;
