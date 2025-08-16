const formatDate = (value: string): string => {
  const digits = value.replace(/\D/g, '');

  const birthday = digits.slice(0, 6);

  return birthday;
};

export default formatDate;
