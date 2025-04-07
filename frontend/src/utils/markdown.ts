export function parseMarkdown(text: string): string {
    // Convert *italic* to <em>italic</em>
    return text.replace(/\*(.*?)\*/g, '<em>$1</em>')
  }

  export function stripMarkdown(text: string): string {
    return text.replace(/\*(.*?)\*/g, '$1');
  }