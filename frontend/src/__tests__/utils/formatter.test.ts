import { formatCitationHTML } from '@/utils/formatter';

describe('formatCitationHTML', () => {
  it('formats a full citation into styled HTML', () => {
    const html = formatCitationHTML({
      author: 'Rick Astley',
      date: '2009, October 25',
      title: 'Never Gonna Give You Up',
      url: 'https://youtu.be/dQw4w9WgXcQ',
    });

    expect(html).toContain('<i>Never Gonna Give You Up</i>');
    expect(html).toContain('Rick Astley');
    expect(html).toContain('2009, October 25');
    expect(html).toContain('<span');
  });
});
