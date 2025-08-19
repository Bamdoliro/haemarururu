import { useFairFormStore } from '@/store/fair/fairType';
import { useCreateFairMutation } from '@/services/fair/mutations';
import type { FairType } from '@/types/fair/client';
import convertToApiDateFormat from '@/utils/functions/convertToApiDateFormat';
import convertToApiDateTimeFormat from '@/utils/functions/convertToApiDateTimeFormat';

export interface FairFormInput {
  start: string;
  place: string;
  capacity: number;
  type: FairType;
  applicationStartDate: string | null;
  applicationEndDate: string | null;
}

export const useFairForm = () => {
  const createFairMutation = useCreateFairMutation();
  const [form, setForm] = useFairFormStore();
  const handleChange = <K extends keyof FairFormInput>(
    key: K,
    value: FairFormInput[K]
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    handleChange(name as keyof FairFormInput, value);
  };

  const handleDateChange = (value: string) => {
    const raw = value.replace(/\D/g, '').slice(0, 8);
    setForm((prev) => ({
      ...prev,
      start: raw + prev.start.slice(8),
    }));
  };

  const handleTimeChange = (value: string) => {
    const raw = value.replace(/\D/g, '').slice(0, 4);
    setForm((prev) => ({
      ...prev,
      start: prev.start.slice(0, 8) + raw,
    }));
  };

  const handleSubmit = () => {
    const body = formatFairRequestBody(form);
    createFairMutation.mutate(body);
  };

  return {
    form,
    handleChange,
    handleInputChange,
    handleDateChange,
    handleTimeChange,
    handleSubmit,
  };
};

export const formatFairRequestBody = ({
  start,
  type,
  place,
  capacity,
  applicationStartDate,
  applicationEndDate,
}: FairFormInput) => {
  return {
    start: convertToApiDateTimeFormat(start),
    capacity: Number(capacity),
    place,
    type,
    applicationStartDate: convertToApiDateFormat(applicationStartDate),
    applicationEndDate: convertToApiDateFormat(applicationEndDate),
  };
};

export type FairApiRequestBody = ReturnType<typeof formatFairRequestBody>;
