import { KEY } from '@/constants/common/constant';
import type { Form, FormStatus, FormType } from '@/types/form/client';
import type { GetFormListRes } from '@/types/form/remote';
import type { RecipientType } from '@/types/message/client';
import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';
import { getMessageRecipientList } from './api';

const NOT_SOCIAL_INTEGRATION_TYPES: FormType[] = [
  'REGULAR',
  'NATIONAL_VETERANS_EDUCATION',
  'SPECIAL_ADMISSION',
];

const getRecipientStatus = (recipient: RecipientType): FormStatus =>
  recipient === 'SOCIAL_INTEGRATION' || recipient === 'REGULAR'
    ? 'FIRST_PASSED'
    : recipient;

const filterRecipientList = (formList: Form[], recipient: RecipientType) => {
  if (recipient === 'SOCIAL_INTEGRATION') {
    return formList.filter((form) => !NOT_SOCIAL_INTEGRATION_TYPES.includes(form.type));
  }
  if (recipient === 'REGULAR') {
    return formList.filter((form) => !form.isChangedToRegular);
  }
  return formList;
};

export const useMessageRecipientListQuery = (recipient: RecipientType) => {
  const status = recipient ? getRecipientStatus(recipient) : null;

  const select = useCallback(
    (data: GetFormListRes) => filterRecipientList(data.dataList, recipient),
    [recipient]
  );

  return useQuery({
    queryKey: [KEY.MESSAGE_RECIPIENT_LIST, status],
    queryFn: () => getMessageRecipientList(status as FormStatus),
    enabled: !!status,
    select,
  });
};
