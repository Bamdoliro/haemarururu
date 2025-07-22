const formatDate = (value: string): string => {
  const digits = value.replace(/\D/g, '');

  const front = digits.slice(0, 6);
  const back = digits.slice(6, 13);

  if (front.length < 6 || back.length < 7) {
    return '';
  }

  return `${front}-${back}`;
};

export default formatDate;
