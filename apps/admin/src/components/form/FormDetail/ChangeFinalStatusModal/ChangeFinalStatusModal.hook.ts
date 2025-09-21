import { ROUTES } from '@/constants/common/constant';
import { useChangeFinalStatusMutation } from '@/services/form/mutations';

export const useChangeFinalStatusAction = (
  id: number,
  status: string,
  closeModal: () => void
) => {
  const { changeFinalStatus } = useChangeFinalStatusMutation(id, status, closeModal);

  const handleChangeFinalStatusButtonClick = () => {
    changeFinalStatus();
    window.location.href = ROUTES.FORM;
  };

  return { handleChangeFinalStatusButtonClick };
};
