export function stripHtmlTags(html: string): string {
  return html
    .replace(/<[^>]*>/g, '')     // Remove all HTML tags
    .split('\n')                 // Split into lines
    .map(line => line.trim())    // Trim each line
    .filter(Boolean)             // Remove empty lines
    .join(' ')                   // Join lines with a space
    .trim();                     // Final trim of the entire string
}
