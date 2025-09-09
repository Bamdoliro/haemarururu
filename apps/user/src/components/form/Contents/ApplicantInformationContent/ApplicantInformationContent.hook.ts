import { useUser } from '@/hooks';
import { ApplicantSchema } from '@/schemas/ApplicantSchema';
import { useSaveFormQuery } from '@/services/form/queries';
import { useFormValueStore, useSetFormStore } from '@/stores';
import { useFormStep, formatBirthday } from '@/utils';
import { useEffect, useState } from 'react';
import type { ChangeEvent } from 'react';
import { z } from 'zod';
import { useEffect, useState } from 'react';
import { useFormStore } from '@/stores';
import { useFormProfileValueStore } from '@/stores/form/formProfile';

export const useApplicantForm = () => {
  const [form, setForm] = useFormStore();
  const profileUrl = useFormProfileValueStore();
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const { run: FormStep } = useFormStep();
  const { userData } = useUser();
  const [hasUploadedImage, setHasUploadedImage] = useState(false);
  const { data: saveFormQuery } = useSaveFormQuery();

  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [RRNFront, setRRNFront] = useState('');
  const [RRNBack, setRRNBack] = useState('');
  const { run: FormStep } = useFormStep();

  useEffect(() => {
    const saved = saveFormQuery?.applicant;

    const name = saved?.name ?? form.applicant.name ?? userData.name ?? '';
    const phone = digits(
      saved?.phoneNumber ?? form.applicant.phoneNumber ?? userData.phoneNumber ?? ''
    );

    const initialReg =
      saved?.registrationNumber ?? form.applicant.registrationNumber ?? '';
    const d = digits(initialReg);
    const front = d.slice(0, 6);
    const back = d.slice(6, 13);

    setRRNFront(front);
    setRRNBack(back);

    setForm((prev) => ({
      ...prev,
      applicant: {
        ...prev.applicant,
        name: saveFormQuery?.applicant.name ?? userData.name,
        phoneNumber: saveFormQuery?.applicant.phoneNumber ?? userData.phoneNumber,
        gender: 'MALE',
        profile: saveFormQuery?.applicant.profile || prev.applicant.profile,
      },
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    saveFormQuery?.applicant?.name,
    saveFormQuery?.applicant?.phoneNumber,
    saveFormQuery?.applicant?.registrationNumber,
    saveFormQuery?.applicant.profile,
    setForm,
    userData.name,
    userData.phoneNumber,
  ]);
  useEffect(() => {
    if (profileUrl?.downloadUrl && profileUrl.downloadUrl !== form.applicant.profile) {
      setForm((prev) => ({
        ...prev,
        applicant: {
          ...prev.applicant,
          profile: profileUrl.downloadUrl,
        },
      }));
    }
  }, [profileUrl?.downloadUrl, form.applicant.profile, setForm]);

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
    const hasValidProfile =
      hasUploadedImage && (profileUrl?.downloadUrl || profileUrl?.uploadUrl);
    const profileValue = hasValidProfile
      ? profileUrl?.downloadUrl || profileUrl?.uploadUrl || 'uploaded'
      : '';

    const currentApplicantData = {
      ...form.applicant,
      profile: profileValue,
    };

    if (hasValidProfile && form.applicant.profile !== profileValue) {
      setForm((prev) => ({
        ...prev,
        applicant: {
          ...prev.applicant,
          profile: profileValue,
        },
      }));
    }
    try {
      ApplicantSchema.parse(currentApplicantData);
      FormStep({
        schema: ApplicantSchema,
        formData: currentApplicantData,
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
  const handleUploadStateChange = (hasImage: boolean) => {
    setHasUploadedImage(hasImage);
  };

  return {
    onFieldChange,
    handleNextStep,
    errors,
    handleUploadStateChange,
  };
};
