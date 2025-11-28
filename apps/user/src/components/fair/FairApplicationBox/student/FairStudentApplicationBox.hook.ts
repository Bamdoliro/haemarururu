import { useFairApplicationQuery } from '@/services/fair/mutations';
import type { FairApplication } from '@/types/fair/client';
import { useState } from 'react';
import type { ChangeEventHandler } from 'react';

export const useCTAButton = (id: number, applicationData: FairApplication) => {
  const { postFairApplicationMutate } = useFairApplicationQuery(id, applicationData);

  const handleSendFairApplication = () => {
    postFairApplicationMutate();
  };

  return { handleSendFairApplication };
};

export const useInput = () => {
  const [application, setApplication] = useState<FairApplication>({
    schoolName: '',
    name: '',
    type: '학생',
    phoneNumber: '',
    headcount: null,
    question: '',
  });

  const handleApplicationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setApplication((prev) => ({
      ...prev,
      [name]: name === 'headcount' ? Number(value) || null : value,
    }));
  };

  const handleApplicationTextAreaChange: ChangeEventHandler<HTMLTextAreaElement> = (
    e
  ) => {
    const { name, value } = e.target;
    setApplication({ ...application, [name]: value });
  };

  return { application, handleApplicationChange, handleApplicationTextAreaChange };
};

export const useAgree = (
  handleSendFairApplication: () => void,
  application: FairApplication
) => {
  const [agree, setAgree] = useState<string | null>(null);

  const handleAgreeChange = (value: string) => {
    setAgree(value);
  };

  const handleButtonClick = () => {
    if (agree !== 'agree') {
      alert('개인정보 동의서를 동의해 주세요.');
      return;
    }

    const missingFields: string[] = [];

    if (!application.schoolName.trim()) missingFields.push('소속학교');
    if (!application.name.trim()) missingFields.push('성함');
    if (!application.phoneNumber.trim()) missingFields.push('연락처');
    if (application.headcount === null || application.headcount === 0) {
      missingFields.push('참석 인원');
    } else if ((application.headcount ?? 0) > 3) {
      alert('참석 인원은 최대 3명까지만 가능합니다.');
      return;
    }

    if (missingFields.length > 0) {
      alert('작성되지 않은 항목이 있습니다.');
      return;
    }

    handleSendFairApplication();
  };

  return { agree, handleAgreeChange, handleButtonClick };
};
