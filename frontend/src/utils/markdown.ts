export function stripMarkdown(text: string): string {
  return text.replace(/\*(.*?)\*/g, '$1');
}