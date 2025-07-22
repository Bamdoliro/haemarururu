const formatDate = {
  normalizeDate: (dateString: string | null | undefined): string => {
    if (typeof dateString !== 'string') {
      return new Date().toISOString();
    }

    let normalizedDate = dateString;

    if (dateString.includes('T')) {
      normalizedDate = new Date(dateString).toISOString();
    } else if (dateString.includes('-')) {
      normalizedDate = new Date(dateString + 'T00:00:00').toISOString();
    } else if (dateString.includes('.')) {
      const reformatted = dateString.replace(/\./g, '-');
      normalizedDate = new Date(reformatted + 'T00:00:00').toISOString();
    } else {
      return new Date().toISOString();
    }

    return normalizedDate;
  },

  toFullDateTime: (dateString: string | null | undefined): string => {
    const date = new Date(formatDate.normalizeDate(dateString));
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${year}년 ${month}월 ${day}일 ${hours}:${minutes}`;
  },

  toShortDateTime: (dateString: string | null | undefined): string => {
    const date = new Date(formatDate.normalizeDate(dateString));
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${year}년 ${month}월 ${day}일`;
  },

  toDayAndDateTime: (dateString: string | null | undefined): string => {
    const date = new Date(formatDate.normalizeDate(dateString));
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
    const dayOfWeek = dayNames[date.getDay()];

    return `${month}월 ${day}일 (${dayOfWeek}) ${hours}:${minutes}`;
  },

  toDashedDate: (dateString: string | null | undefined): string => {
    const date = new Date(formatDate.normalizeDate(dateString));
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  },

  toDotDate: (dateString: string | null | undefined): string => {
    const date = new Date(formatDate.normalizeDate(dateString));
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}.${month}.${day}`;
  },
};

export default formatDate;
