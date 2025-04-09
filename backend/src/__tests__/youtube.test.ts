import { describe, it, expect } from 'vitest';
import { extractVideoId } from '../utils/youtube';

describe('extractVideoId', () => {
  it('extracts ID from youtu.be short link', () => {
    const url = 'https://youtu.be/dQw4w9WgXcQ';
    expect(extractVideoId(url)).toBe('dQw4w9WgXcQ');
  });

  it('extracts ID from youtu.be with timestamp', () => {
    const url = 'https://youtu.be/dQw4w9WgXcQ?t=30s';
    expect(extractVideoId(url)).toBe('dQw4w9WgXcQ');
  });

  it('extracts ID from watch?v= URL', () => {
    const url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&feature=share';
    expect(extractVideoId(url)).toBe('dQw4w9WgXcQ');
  });

  it('extracts ID from embed URL', () => {
    const url = 'https://www.youtube.com/embed/dQw4w9WgXcQ';
    expect(extractVideoId(url)).toBe('dQw4w9WgXcQ');
  });

  it('extracts ID from m.youtube.com', () => {
    const url = 'https://m.youtube.com/watch?v=dQw4w9WgXcQ';
    expect(extractVideoId(url)).toBe('dQw4w9WgXcQ');
  });

  it('returns null for unsupported domain', () => {
    expect(extractVideoId('https://example.com/video')).toBeNull();
  });

  it('returns null for invalid YouTube URL', () => {
    expect(extractVideoId('https://youtube.com/watch')).toBeNull();
  });

  it('returns null on malformed URL', () => {
    expect(extractVideoId('not-a-url')).toBeNull();
  });
});
