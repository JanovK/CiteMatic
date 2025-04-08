import { stripMarkdown } from '../markdown';

describe('stripMarkdown', () => {
  it('removes asterisk-based italics from markdown', () => {
    const input = '*Hello*, this is a *test*';
    const output = stripMarkdown(input);
    expect(output).toBe('Hello, this is a test');
  });

  it('returns plain text if no markdown present', () => {
    const input = 'No formatting here.';
    expect(stripMarkdown(input)).toBe(input);
  });
});
