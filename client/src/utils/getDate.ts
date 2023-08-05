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

export const getDateHoursMinute = (date: string) => {
  const dateTime = new Date(date);

  const hours = dateTime.getHours();
  const minutes = dateTime.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';

  const hours12 = hours % 12 || 12;

  return `${hours12}:${minutes.toString().padStart(2, '0')} ${ampm}`;
};

export const formatMessageDate = (date: string) => {
  const today = new Date();
  const messageDate = new Date(date);

  if (
    messageDate.getDate() === today.getDate() &&
    messageDate.getMonth() === today.getMonth() &&
    messageDate.getFullYear() === today.getFullYear()
  ) {
    return 'today';
  }

  return messageDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

export const formatVideoLength = (durationInSeconds: number) => {
  const hours = Math.floor(durationInSeconds / 3600);
  const minutes = Math.floor((durationInSeconds % 3600) / 60);
  const seconds = Math.floor(durationInSeconds % 60);

  const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

  if (hours > 0) {
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  } else {
    return `${formattedMinutes}:${formattedSeconds}`;
  }
};
