import { formAtom } from '@/stores';
import type { Address } from 'react-daum-postcode';
import { useSetAtom } from 'jotai';

export const useOnComplete = (onClose: () => void) => {
  const setForm = useSetAtom(formAtom);

  const handleCompleteFindAddress = ({ address, zonecode }: Address) => {
    setForm((prev) => ({
      ...prev,
      parent: { ...prev.parent, address, zoneCode: zonecode },
    }));
    onClose();
  };

  return { handleCompleteFindAddress };
};
