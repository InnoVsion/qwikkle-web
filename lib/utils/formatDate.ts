// Add locale and timezone support as needed

/**
 * Formats an ISO date string into a human-readable date.
 *
 * @param iso - ISO 8601 date string
 * @param options - Intl.DateTimeFormatOptions overrides
 */
export function formatDate(
  iso: string,
  options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' },
): string {
  return new Intl.DateTimeFormat('en-US', options).format(new Date(iso));
}
