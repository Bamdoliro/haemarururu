import { useEffect, useState } from 'react';
import { useToast } from '@maru/hooks';
import { SCHEDULE_FIELDS, SCHEDULE_ORDER_RULES } from '@/constants/schedule/constant';
import { usePutCurrentScheduleMutation } from '@/services/schedule/mutations';
import { useCurrentScheduleQuery } from '@/services/schedule/queries';
import type {
  Schedule,
  ScheduleDateTimes,
  ScheduleError,
  ScheduleInput,
  ScheduleKey,
} from '@/types/schedule/client';

const FIELD_MAP = Object.fromEntries(
  SCHEDULE_FIELDS.map((field) => [field.key, field]),
) as Record<ScheduleKey, (typeof SCHEDULE_FIELDS)[number]>;

const EMPTY_SCHEDULE_INPUT = Object.fromEntries(
  SCHEDULE_FIELDS.map(({ key }) => [key, '']),
) as ScheduleInput;

const toInputValue = (key: ScheduleKey, value: string | null) => {
  if (!value) return '';

  return FIELD_MAP[key].type === 'date' ? value.slice(0, 10) : value.slice(0, 16);
};

const toInputForm = (schedule: Schedule) =>
  Object.fromEntries(
    SCHEDULE_FIELDS.map(({ key }) => [key, toInputValue(key, schedule[key])]),
  ) as ScheduleInput;

const toRequestValue = (key: ScheduleKey, value: string, schedule: Schedule) => {
  if (!value) return null;
  if (FIELD_MAP[key].type === 'date') return value;
  if (value === toInputValue(key, schedule[key])) return schedule[key];

  return `${value}:00`;
};

const validateSchedule = (form: ScheduleInput) => {
  const errors: ScheduleError = {};

  SCHEDULE_FIELDS.forEach(({ key, optional }) => {
    if (!form[key] && !optional) errors[key] = '필수 입력 항목입니다.';
  });

  if (!form.maintenanceStart !== !form.maintenanceEnd) {
    const emptyKey = form.maintenanceStart ? 'maintenanceEnd' : 'maintenanceStart';
    errors[emptyKey] = '점검 시작과 종료를 함께 입력해주세요.';
  }

  SCHEDULE_ORDER_RULES.forEach(({ before, after, allowEqual }) => {
    if (errors[before] || errors[after]) return;
    if (!form[before] || !form[after]) return;

    const isInvalidOrder = allowEqual
      ? form[before] > form[after]
      : form[before] >= form[after];

    if (isInvalidOrder) {
      errors[after] =
        `${FIELD_MAP[before].label} ${allowEqual ? '이후(같은 시각 가능)' : '이후'}여야 합니다.`;
    }
  });

  if (
    !errors.attendanceStandardDate &&
    form.attendanceStandardDate &&
    form.applicationFormEnd &&
    form.attendanceStandardDate > form.applicationFormEnd.slice(0, 10)
  ) {
    errors.attendanceStandardDate = '원서 접수 마감일 이전(같은 날 가능)이어야 합니다.';
  }

  return errors;
};

export const useScheduleForm = () => {
  const { data: schedule, isLoading, isError } = useCurrentScheduleQuery();
  const { putCurrentScheduleMutate, isPending } = usePutCurrentScheduleMutation();
  const { toast } = useToast();
  const [form, setForm] = useState<ScheduleInput>(EMPTY_SCHEDULE_INPUT);
  const [errors, setErrors] = useState<ScheduleError>({});

  useEffect(() => {
    if (!schedule) return;

    setForm(toInputForm(schedule));
    setErrors({});
  }, [schedule]);

  const handleChange = (key: ScheduleKey, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleReset = () => {
    if (!schedule) return;

    setForm(toInputForm(schedule));
    setErrors({});
  };

  const handleSubmit = () => {
    if (!schedule) return;

    const validationErrors = validateSchedule(form);
    setErrors(validationErrors);

    if (Object.values(validationErrors).some(Boolean)) {
      toast('입력한 일정을 다시 확인해주세요.', 'ERROR');
      return;
    }

    // 필수 항목은 위 검증을 통과했으므로 null이 아니다.
    const dateTimes = SCHEDULE_FIELDS.reduce(
      (acc, { key }) => ({ ...acc, [key]: toRequestValue(key, form[key], schedule) }),
      {} as ScheduleDateTimes,
    );

    putCurrentScheduleMutate({
      admissionYear: schedule.admissionYear,
      version: schedule.version,
      ...dateTimes,
    });
  };

  return {
    schedule,
    form,
    errors,
    isLoading,
    isError,
    isPending,
    handleChange,
    handleReset,
    handleSubmit,
  };
};
