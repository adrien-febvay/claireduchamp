function pad(val: number) {
  const zero = val < 10 ? '0' : '';
  return `${zero}${val}`;
}

export function sitemapDate(date = new Date()) {
  const timezoneOffset = -date.getTimezoneOffset();
  const timezoneDate = new Date(Number(date) + timezoneOffset * 6e4);
  const timezoneHoursOffset = Math.floor(Math.abs(timezoneOffset) / 60);
  const timezoneMinutesOffset = Math.floor(Math.abs(timezoneOffset) % 60);
  const timezoneLeadingSign = timezoneOffset < 0 ? '-' : '+';
  const formattedTimezoneOffset = `${timezoneLeadingSign}${pad(timezoneHoursOffset)}:${pad(timezoneMinutesOffset)}`;
  return timezoneDate.toISOString().replace(/\..*/, formattedTimezoneOffset);
}

export function readableDate(date = new Date()) {
  return sitemapDate(date)
    .replace('T', ' ')
    .replace(/(?=[-+]\d\d:)/, ' GMT');
}
