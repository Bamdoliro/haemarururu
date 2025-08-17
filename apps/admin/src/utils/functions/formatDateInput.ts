const formatDateInput = (digits: string) => {
  const raw = digits.replace(/\D/g, '').slice(0, 8);

  const y = raw.slice(0, 4);
  const m = raw.slice(4, 6);
  const d = raw.slice(6, 8);

  if (raw.length <= 4) return y;
  if (raw.length <= 6) return `${y}-${m}`;
  return `${y}-${m}-${d}`;
};

export default formatDateInput;
