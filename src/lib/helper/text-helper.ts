export function countWords(text?: string): number {
  if (!text) return 0; // handles null, undefined, or empty string
  return text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
}
