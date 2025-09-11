import { useUser } from '@/hooks';
import { ApplicantSchema } from '@/schemas/ApplicantSchema';
import { useSaveFormQuery } from '@/services/form/queries';
import { useFormValueStore, useSetFormStore } from '@/stores';
import { useFormStep, formatBirthday } from '@/utils';
import { useEffect, useRef, useState } from 'react';
import type { ChangeEvent } from 'react';
import { z } from 'zod';

const digits = (v: string) => v.replace(/\D/g, '');

export const useApplicantForm = () => {
  const form = useFormValueStore();
  const setForm = useSetFormStore();
  const { userData } = useUser();
  const { data: saveFormQuery } = useSaveFormQuery();

  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [RRNFront, setRRNFront] = useState('');
  const [RRNBack, setRRNBack] = useState('');
  const { run: FormStep } = useFormStep();

  const isInitialized = useRef(false);

  useEffect(() => {
    const saved = saveFormQuery?.applicant;
    if (
      isInitialized.current &&
      !saveFormQuery?.applicant &&
      !userData.name &&
      !userData.phoneNumber &&
      !saveFormQuery?.applicant.profile
    ) {
      return;
    }
    const name =
      saved?.name ||
      (form.applicant?.name && form.applicant.name.trim()) ||
      userData.name ||
      '';
    const phone = digits(
      saved?.phoneNumber ||
        (form.applicant?.phoneNumber && form.applicant.phoneNumber.trim()) ||
        userData.phoneNumber ||
        ''
    );
    const initialReg =
      saved?.registrationNumber ?? form.applicant.registrationNumber ?? '';
    const d = digits(initialReg);
    const front = d.slice(0, 6);
    const back = d.slice(6, 13);

    const needsUpdate =
      RRNFront !== front ||
      RRNBack !== back ||
      form.applicant?.name !== name ||
      form.applicant?.phoneNumber !== phone;
    if (needsUpdate) {

      setRRNFront(front);
      setRRNBack(back);

      setRRNFront(front);
      setRRNBack(back);
      setForm((prev) => ({
        ...prev,
        applicant: {
          ...(prev.applicant || {}),
          name,
          phoneNumber: phone,
          gender: prev.applicant?.gender ?? 'MALE',
          registrationNumber:
            front || back
              ? `${front}${back ? '-' + back : ''}`
              : prev.applicant?.registrationNumber ?? '',
          profile: prev.applicant?.profile ?? '',
        },
      }));

      isInitialized.current = true;
    }
  }, [
    saveFormQuery?.applicant?.name,
    saveFormQuery?.applicant?.phoneNumber,
    saveFormQuery?.applicant?.registrationNumber,
    saveFormQuery?.applicant?.profile,
    userData.name,
    userData.phoneNumber,
  ]);

  const formatter: Record<string, (value: string) => string> = {
    phoneNumber: (value) => digits(value),
  };

  type OnArg = string | ChangeEvent<HTMLInputElement>;

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
          [name]: raw,
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
        birthday: formatBirthday(form.applicant.registrationNumber),
      },
    }));
    clearFieldErrors([name]);
  };

  const handleNextStep = () => {
    try {
      FormStep({
        schema: ApplicantSchema,
        formData: {
          ...form.applicant,
          registrationNumberFront: RRNFront,
          registrationNumberBack: RRNBack,
        },
        nextStep: '보호자정보',
        setErrors,
      });
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
