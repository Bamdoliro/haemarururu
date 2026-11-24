import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

const MAX_TIMEOUT_DELAY = 2 ** 31 - 1;

const useNow = (boundaries: Dayjs[]) => {
  const [now, setNow] = useState(() => dayjs());

  const nextBoundary = boundaries
    .map((boundary) => boundary.valueOf())
    .filter((time) => time > now.valueOf())
    .sort((a, b) => a - b)[0];

  useEffect(() => {
    if (nextBoundary === undefined) return;

    const delay = Math.max(nextBoundary - Date.now(), 0);
    if (delay > MAX_TIMEOUT_DELAY) return;

    const timer = setTimeout(() => setNow(dayjs()), delay);
    return () => clearTimeout(timer);
  }, [nextBoundary, now]);

  return now;
};

export default useNow;
