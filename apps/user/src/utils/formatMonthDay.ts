import dayjs, { type Dayjs } from 'dayjs';

const formatMonthDay = (date: string | Dayjs, type?: 'DAY_OF_WEEK'): string => {
  const day = dayjs(date);
  const m = day.month() + 1;
  const d = day.date();

  if (type === 'DAY_OF_WEEK') {
    const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
    const dayOfWeek = dayNames[day.day()];
    return `${m}월 ${d}일(${dayOfWeek})`;
  }

  return `${m}월 ${d}일`;
};

export default formatMonthDay;
