const formatBirthdayDate = (value: string): string => {
  const digits = value.replace(/\D/g, '');
  const year = digits.slice(0, 2);
  const month = digits.slice(2, 4);
  const day = digits.slice(4, 6);

  return `20${year}-${month}-${day}`;
};

export default formatBirthdayDate;
