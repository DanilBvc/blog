export const getDateFrom = (date: Date) => {
  const from = new Date(date);

  const now = new Date();

  const millDif = now.getTime() - from.getTime();

  const millS = Math.abs(millDif);
  const sec = Math.floor(millS / 1000);

  if (sec >= 60) {
    const min = Math.floor(sec / 60);

    if (min >= 60) {
      const hours = Math.floor(min / 60);

      if (hours >= 24) {
        const days = Math.floor(hours / 24);
        return `${days} day ago`;
      } else {
        return `${hours} hour ago`;
      }
    } else {
      return `${min} minute ago`;
    }
  } else {
    return `${sec} second ago`;
  }
};
