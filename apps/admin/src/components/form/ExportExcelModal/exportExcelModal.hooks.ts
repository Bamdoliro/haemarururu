import { KEY } from '@/constants/common/constant';
import { getExportExcel } from '@/services/form/api';
import type { ExportExcelType } from '@/types/form/client';
import { downloadBlob } from '@/utils';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

export const useExportExcelAction = (exportExcelType: ExportExcelType) => {
  const queryClient = useQueryClient();
  const [isExporting, setIsExporting] = useState(false);

  const handleExportExcelButtonClick = async () => {
    if (isExporting) return;
    setIsExporting(true);

    try {
      const exportExcelData = await queryClient.fetchQuery({
        queryKey: [KEY.FORM_EXPORT_EXCEL, exportExcelType],
        queryFn: () => getExportExcel(exportExcelType),
      });

      downloadBlob(new Blob([exportExcelData]), `${exportExcelType}.xlsx`);
    } finally {
      setIsExporting(false);
    }
  };

  return { handleExportExcelButtonClick, isExporting };
};
