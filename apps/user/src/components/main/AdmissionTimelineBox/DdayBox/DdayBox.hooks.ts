import { ROUTES } from '@/constants/common/constants';
import { useSchedule } from '@/services/schedule/queries';
import type { Schedule } from '@/services/schedule/queries';
import { formatDay } from '@/utils';
import { useInterval } from '@maru/hooks';
import type { ButtonStyleType } from '@maru/ui';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import isBetween from 'dayjs/plugin/isBetween';
import utc from 'dayjs/plugin/utc';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

dayjs.extend(isBetween);
dayjs.extend(utc);
dayjs.locale('ko');

const getScheduleStatus = (schedule: Schedule) =>
  new Map([
    [schedule.방문_원서_접수.toString(), '원서 접수 시작까지'],
    [schedule.이차_면접.toString(), '면접 전형 시작까지'],
    [schedule.최종_합격_발표.toString(), '최종합격자 발표'],
    [schedule.일차_합격_발표.toString(), '서류 합격자 발표'],
    [schedule.입학_등록.toString(), '입학 등록 기간'],
  ]);

const UPDATE_INTERVAL = 1000;

const useDday = () => {
  const schedule = useSchedule();
  const getCurrentTime = () => {
    const now = dayjs();

    if (now.isBefore(schedule.방문_원서_접수)) return schedule.방문_원서_접수;
    if (now.isBefore(schedule.원서_접수_마감)) return schedule.원서_접수_마감;
    if (now.isBefore(schedule.일차_합격_발표.add(1, 'day')))
      return schedule.일차_합격_발표;
    if (now.isBefore(schedule.이차_면접)) return schedule.이차_면접;
    if (now.isBefore(schedule.이차_면접_종료)) return schedule.이차_면접_종료;
    if (now.isBefore(schedule.최종_합격_발표.add(1, 'day')))
      return schedule.최종_합격_발표;
    if (now.isBetween(schedule.입학_등록, schedule.입학_등록_마감))
      return schedule.입학_등록;

    return now;
  };

  const currentTime = getCurrentTime();
  const [remainDays, setRemainDays] = useState(0);

  useEffect(() => {
    setRemainDays(currentTime.diff(dayjs().startOf('day'), 'days', true));
  }, [currentTime]);

  useInterval(() => {
    setRemainDays(currentTime.diff(dayjs(), 'days', true));
  }, UPDATE_INTERVAL);

  return {
    currentTime,
    remainDays,
  };
};

export const useRemainDate = () => {
  const schedule = useSchedule();
  const { currentTime, remainDays } = useDday();
  const now = dayjs();
  const timeDiff = dayjs.utc(currentTime.diff(now)).format('HH:mm:ss');

  const status = getScheduleStatus(schedule).get(currentTime.toString());
  const remainTime = remainDays >= 1 || remainDays < 0 ? formatDay(remainDays) : timeDiff;

  // 원서 접수가 타깃일 때는 시작일만이 아니라 접수 기간 전체(방문 원서 접수 기준)를 보여준다
  const isApplicationTarget =
    currentTime.isSame(schedule.방문_원서_접수) ||
    currentTime.isSame(schedule.원서_접수_마감);
  const targetDate = isApplicationTarget
    ? `${schedule.방문_원서_접수.format(
        'YYYY년 M월 D일(ddd) HH:mm'
      )} ~ ${schedule.원서_접수_마감.format('YYYY년 M월 D일(ddd) HH:mm')}`
    : currentTime.format('YYYY년 MM월 DD일 (ddd) HH:mm');
  const isSecondRoundDay = now.isBetween(schedule.이차_면접, schedule.이차_면접_종료);

  return {
    status,
    remainTime,
    targetDate,
    isSecondRoundDay,
  };
};

export const useButtonStatus = () => {
  const schedule = useSchedule();
  const { currentTime, remainDays } = useDday();
  const router = useRouter();
  const isSubmitPeriod = dayjs().isBetween(schedule.원서_접수, schedule.원서_접수_마감);

  const isPeriodOfViewing =
    (-2 < remainDays && remainDays <= 0) ||
    dayjs().isBetween(schedule.입학_등록, schedule.입학_등록_마감);

  const buttonStyleType: ButtonStyleType = isPeriodOfViewing ? 'PRIMARY' : 'DISABLED';

  const handleMovePage = () => {
    if (dayjs().isBefore(schedule.원서_접수_마감)) {
      router.push(ROUTES.SIGNUP);
    } else if (isPeriodOfViewing) {
      if (currentTime.isSame(schedule.일차_합격_발표)) {
        router.push(ROUTES.FIRST_RESULT);
      } else if (currentTime.isSame(schedule.최종_합격_발표)) {
        router.push(ROUTES.FINAL_RESULT);
      } else if (dayjs().isBetween(schedule.입학_등록, schedule.입학_등록_마감)) {
        router.push(ROUTES.ADMISSION_REGISTRATION);
      }
    }
  };

  const buttonText = dayjs().isBefore(schedule.원서_접수_마감)
    ? '원서 접수하기'
    : dayjs().isBetween(schedule.입학_등록, schedule.입학_등록_마감)
    ? '입학 등록하기'
    : '결과 확인하기';

  return {
    buttonStyleType,
    isSubmitPeriod,
    handleMovePage,
    buttonText,
  };
};
