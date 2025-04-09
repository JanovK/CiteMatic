/**
 * Attempt to extract the YouTube video ID from various formats:
 * - https://youtu.be/<id>?t=30s
 * - https://www.youtube.com/watch?v=<id>&feature=youtu.be
 * - https://youtube.com/embed/<id>?foo=bar
 * - Possibly m.youtube.com, etc.
 *
 * Returns the 11-char video ID or null if not recognized
 */
export function extractVideoId(url: string): string | null {
    try {
      const parsed = new URL(url);
      const hostname = parsed.hostname.replace(/^www\./, '');
  
      let id: string | undefined;
  
      if (hostname === 'youtu.be') {
        // Short link: https://youtu.be/<id>
        // Example path: "/dQw4w9WgXcQ"
        // Slice off leading slash:
        id = parsed.pathname.slice(1);
  
      } else if (hostname === 'youtube.com' || hostname === 'm.youtube.com') {
        // Full link: https://youtube.com/watch?v=<id> or /embed/<id>
        if (parsed.pathname.startsWith('/embed/')) {
          // e.g. https://www.youtube.com/embed/dQw4w9WgXcQ?start=30
          id = parsed.pathname.replace('/embed/', '');
        } else {
          // e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ
          id = parsed.searchParams.get('v') ?? undefined;
        }
  
      } else {
        // If it's e.g. "youtube-nocookie.com" or some other domain, you could handle that here...
        return null;
      }
  
      if (!id) return null;
  
      // Typically YouTube IDs are 11 chars in [A-Za-z0-9_-].
      // We'll do a quick validation check:
      const match = id.match(/^[\w-]{11}$/);
      return match ? match[0] : null;
  
    } catch {
      // If URL constructor fails, or something else breaks
      return null;
    }
  }