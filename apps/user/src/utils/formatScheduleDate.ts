import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';

const formatScheduleDate = (
  dates: (string | Dayjs)[],
  type?: 'FORM' | 'INTERVIEW' | 'REGISTRATION' | 'STANDARD' | 'RESULT'
): string => {
  const formatDate = (date: Dayjs, withTime = true) => {
    const y = date.year();
    const m = date.month() + 1;
    const d = date.date();
    const hh = String(date.hour()).padStart(2, '0');
    const mm = String(date.minute()).padStart(2, '0');
    const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
    const dayOfWeek = dayNames[date.day()];
    return withTime
      ? `${y}년 ${m}월 ${d}일(${dayOfWeek}) ${hh}:${mm}`
      : `${y}년 ${m}월 ${d}일(${dayOfWeek})`;
  };

  const toDayjs = (d: string | Dayjs) => (typeof d === 'string' ? dayjs(d) : d);

  if (dates.length === 1) {
    const date = toDayjs(dates[0]);
    if (type === 'STANDARD') {
      return formatDate(date, false);
    }
    return formatDate(date, true);
  }

  if (dates.length === 2) {
    const start = toDayjs(dates[0]);
    const end = toDayjs(dates[1]);
    const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
    if (type === 'FORM') {
      return `${start.year()}년 ${
        start.month() + 1
      }월 ${start.date()}일 ~ ${end.date()}일 ${end.format('HH:mm')}`;
    }

    if (type === 'INTERVIEW') {
      return `${start.year()}년 ${start.month() + 1}월 ${start.date()}일 ${start.format(
        'HH:mm'
      )} ~ ${end.format('HH:mm')}`;
    }

    if (type === 'REGISTRATION') {
      return `${start.year()}년 ${
        start.month() + 1
      }월 ${start.date()}일 ~ ${end.date()}일`;
    }
    if (type === 'RESULT') {
      return `${start.month() + 1}월 ${start.date()}일(${
        dayNames[start.day()]
      }) ${start.format('HH:mm')}~ ${end.month() + 1}월${end.date()}일(${
        dayNames[end.day()]
      }) ${end.format('HH:mm')}`;
    }
  }

  return '';
};

export default formatScheduleDate;
