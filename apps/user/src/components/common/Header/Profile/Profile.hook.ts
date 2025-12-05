import { ROUTES } from '@/constants/common/constants';
import { useLogoutMutation } from '@/services/auth/mutations';
import { useRouter } from 'next/navigation';

export const useCTAButton = (status?: string) => {
  const router = useRouter();
  const { logoutMutate } = useLogoutMutation();

  const banStatus =
    status === 'APPROVED' ||
    status === 'FINAL_SUBMITTED' ||
    status === 'PASSED' ||
    status === 'RECEIVED' ||
    status === 'FIRST_PASSED' ||
    status === 'FAILED' ||
    status === 'FIRST_FAILED' ||
    status === 'NO_SHOW' ||
    status === 'ENTERED';

  const handleMoveForm = () => {
    if (banStatus) {
      alert('현재 상태에서는 원서 작성 페이지로 이동할 수 없습니다.');
      return;
    }
    router.push(ROUTES.FORM);
  };

  const handleMoveManagement = () => {
    router.push(ROUTES.FORM_MANAGEMENT);
  };

  const handleMoveSimulation = () => {
    router.push(ROUTES.SIMULATION);
  };

  const handleMoveInquiry = () => {
    router.push(
      'https://docs.google.com/forms/d/e/1FAIpQLSf9Dr08OxCB0lr6UY7OIEkUpniOkK7t0QpJewkMEmApr3U6qw/viewform'
    );
  };

  const handleLogout = () => {
    logoutMutate();
  };

  const handleMoveChangePassword = () => {
    router.push(ROUTES.PASSWORD);
  };

  const handleMoveWithdrawal = () => {
    router.push(ROUTES.WITHDRAWAL);
  };

  return {
    handleMoveForm,
    handleMoveManagement,
    handleMoveSimulation,
    handleMoveInquiry,
    handleLogout,
    handleMoveChangePassword,
    handleMoveWithdrawal,
  };
};
