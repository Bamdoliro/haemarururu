import { useUser } from '@/hooks';
import { ApplicantSchema } from '@/schemas/ApplicantSchema';
import { useSaveFormQuery } from '@/services/form/queries';
import { useFormValueStore, useSetFormStore } from '@/stores';
import { useFormStep, formatBirthday } from '@/utils';
import { useEffect, useRef, useState } from 'react';
import type { ChangeEvent } from 'react';
import { z } from 'zod';
import { useFormProfileValueStore } from '@/stores/form/formProfile';

const digits = (v: string) => v.replace(/\D/g, '');

export const useApplicantForm = () => {
  const form = useFormValueStore();
  const setForm = useSetFormStore();
  const profileUrl = useFormProfileValueStore();
  const { userData } = useUser();
  const { data: saveFormQuery } = useSaveFormQuery();

  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [RRNFront, setRRNFront] = useState('');
  const [RRNBack, setRRNBack] = useState('');
  const { run: FormStep } = useFormStep();

  const clearFieldErrors = (names: string[]) => {
    let changed = false;
    const next = { ...errors };
    for (const n of names) {
      if (next[n]?.length) {
        next[n] = [];
        changed = true;
      }
    }
    if (changed) setErrors(next);
  };

  const isInitialized = useRef(false);

  useEffect(() => {
    const url = profileUrl?.downloadUrl || '';
    if (!url) return;
    setForm((prev) => ({
      ...prev,
      applicant: { ...prev.applicant, profile: url },
    }));
    setErrors((prevErr) =>
      prevErr.profile?.length ? { ...prevErr, profile: [] } : prevErr
    );
  }, [profileUrl?.downloadUrl, setForm]);

  useEffect(() => {
    if (isInitialized.current) return;

    const saved = saveFormQuery?.applicant;
    const d = digits(
      saved?.registrationNumber ?? form.applicant.registrationNumber ?? ''
    );
    const front = d.slice(0, 6);
    const back = d.slice(6, 13);

    const name = saved?.name || form.applicant?.name || userData.name || '';
    const phone = digits(
      saved?.phoneNumber || form.applicant?.phoneNumber || userData.phoneNumber || ''
    );

    setRRNFront(front);
    setRRNBack(back);

    setForm((prev) => ({
      ...prev,
      applicant: {
        ...(prev.applicant || {}),
        name,
        phoneNumber: phone,
        gender: prev.applicant?.gender ?? 'MALE',
        registrationNumber: front && back ? `${front}-${back}` : '',
        profile: saved?.profile ?? prev.applicant?.profile ?? '',
      },
    }));

    isInitialized.current = true;
  }, [saveFormQuery, setForm, userData, form.applicant]);

  const formatter: Record<string, (value: string) => string> = {
    phoneNumber: (value) => digits(value),
  };

  type OnArg = string | ChangeEvent<HTMLInputElement>;

  const onFieldChange = (arg: OnArg) => {
    const name =
      typeof arg === 'string'
        ? (document.activeElement as HTMLInputElement | null)?.name ?? ''
        : arg.target.name;

    const raw = typeof arg === 'string' ? arg : arg.target.value;
    if (!name) return;

    if (name === 'registrationNumberFront') {
      const front = digits(raw).slice(0, 6);
      setRRNFront(front);
      setForm((prev) => ({
        ...prev,
        applicant: {
          ...prev.applicant,
          registrationNumber: `${front}${RRNBack ? '-' + RRNBack : ''}`,
        },
      }));
      clearFieldErrors(['registrationNumberFront', 'registrationNumber']);
      return;
    }

    if (name === 'registrationNumberBack') {
      const back = digits(raw).slice(0, 7);
      setRRNBack(back);
      setForm((prev) => ({
        ...prev,
        applicant: {
          ...prev.applicant,
          registrationNumber: `${RRNFront}${back ? '-' + back : ''}`,
        },
      }));
      clearFieldErrors(['registrationNumberBack', 'registrationNumber']);
      return;
    }

    if (name === 'phoneNumber') {
      const val = formatter.phoneNumber(raw);
      setForm((prev) => ({
        ...prev,
        applicant: {
          ...prev.applicant,
          phoneNumber: val,
        },
      }));
      clearFieldErrors(['phoneNumber']);
      return;
    }

    setForm((prev) => ({
      ...prev,
      applicant: {
        ...prev.applicant,
        [name]: raw,
      },
    }));
    clearFieldErrors([name]);
  };

  const handleNextStep = () => {
    try {
      const formDataWithRRN = {
        ...form.applicant,
        registrationNumberFront: RRNFront,
        registrationNumberBack: RRNBack,
      };

      FormStep({
        schema: ApplicantSchema,
        formData: formDataWithRRN,
        nextStep: '보호자정보',
        setErrors,
      });
      setForm((prev) => ({
        ...prev,
        applicant: {
          ...prev.applicant,
          birthday: formatBirthday(prev.applicant.registrationNumber),
        },
      }));

    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors = err.flatten().fieldErrors;
        const normalizedErrors = Object.fromEntries(
          Object.entries(fieldErrors).map(([key, value]) => [key, value ?? []])
        );
        setErrors(normalizedErrors);
      }
    }
  };

  return { onFieldChange, handleNextStep, errors, RRNBack, RRNFront };
};