type FormatDateParams = {
  date: string | Date;
  locales?: string | string[];
  options?: Intl.DateTimeFormatOptions;
};

export function formatDate({
  date,
  locales = 'en-US',
  options = {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }
}: FormatDateParams): string {
  return new Date(date).toLocaleString(locales, options);
}
