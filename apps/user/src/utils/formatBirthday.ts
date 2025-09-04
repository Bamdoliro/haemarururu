const formatBirthday = (value: string): string => {
  const digits = value.replace(/\D/g, '');
  const year = digits.slice(0, 2);
  const month = digits.slice(2, 4);
  const day = digits.slice(4, 6);
  const century = parseInt(digits[6], 10) == 1 ? '19' : '20';

  return `${century}${year}-${month}-${day}`;
};

export default formatBirthday;
