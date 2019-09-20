export enum Month {
  'jan' = 'January',
  'feb' = 'February',
  'mar' = 'March',
  'apr' = 'April',
  'may' = 'May',
  'jun' = 'June',
  'jul' = 'July',
  'aug' = 'August',
  'sep' = 'September',
  'oct' = 'October',
  'nov' = 'November',
  'dec' = 'December',
}

export function isToday(date: Date) {
  const today = new Date();
  return (
    today.getFullYear() === date.getFullYear() &&
    today.getMonth() === date.getMonth() &&
    today.getDate() === date.getDate()
  );
}

export function isYesterday(date: Date) {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  return (
    yesterday.getFullYear() === date.getFullYear() &&
    yesterday.getMonth() === date.getMonth() &&
    yesterday.getDate() === date.getDate()
  );
}

export function prettyDate(date: Date | number) {
  if (typeof date === 'number') date = new Date(date);

  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  let dateString = `${Object.values(Month)[month]} ${day}, ${year}`;

  if (isToday(date)) {
    dateString = 'Today';
  } else if (isYesterday(date)) {
    dateString = 'Yesterday';
  }

  let minutes: number | string = date.getMinutes();
  let hours = date.getHours();
  let amOrPm = 'am';

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours > 12) {
    hours = hours - 12;
    amOrPm = 'pm';
  }

  const timeString = `${hours}:${minutes} ${amOrPm}`;

  return `${dateString} at ${timeString}`;
}
