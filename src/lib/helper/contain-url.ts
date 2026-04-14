// CHECK IF ITS CONTAIN URL, IF YES, DO NOT ALLOW
export function containsUrl(value: string): boolean {
  return /(https?:\/\/|www\.|\.com|\.net|\.org)/i.test(value);
}
