import { stripHtmlTags } from '@/utils/html';

describe('stripHtmlTags', () => {
  it('removes HTML tags and returns plain text', () => {
    const input = `<p><i>Rick Astley</i>. <span>Never Gonna Give You Up</span></p>`;
    const output = stripHtmlTags(input);
    expect(output).toBe('Rick Astley. Never Gonna Give You Up');
  });
});
