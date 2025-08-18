const formatTimeInput = (digits: string) => {
  const raw = digits.replace(/\D/g, '').slice(0, 4);

  const hh = raw.slice(0, 2);
  const mm = raw.slice(2, 4);

  if (raw.length <= 2) return hh;
  return `${hh}:${mm}`;
};

export default formatTimeInput;
