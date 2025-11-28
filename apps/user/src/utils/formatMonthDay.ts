import dayjs, { type Dayjs } from 'dayjs';

const formatMonthDay = (date: string | Dayjs): string => {
  const day = dayjs(date);

  const m = day.month() + 1;
  const d = day.date();

  return `${m}월 ${d}일`;
};

export default formatMonthDay;
