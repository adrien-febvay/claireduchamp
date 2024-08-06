import { _ } from '@/utils/types';

/**
 * Parse a time value with second or millisecond unit.
 * @param value String to convert.
 * @returns The time value as a float, or `NaN` in case of conversion error.
 */
export function parseTime(value: _.Optional<string>): number {
  const match = value ? /^\s*-?(?:\d*(?:\.\d+)|\d+)(?:e\d+)?(m?)s(?:\s|$)/.exec(value) : null;
  const float = value && match ? parseFloat(value) : NaN;
  return float && match?.[1] ? float * 1000 : float;
}
