import { useState, useEffect } from 'react';
import React from 'react';
import { useTheme } from 'next-themes';
import { formatCitationHTML } from '@/utils/formatter';
import { stripMarkdown } from '@/utils/markdown';

type CitationParts = {
  author: string;
  date: string;
  title: string;
  url: string;
};

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const [videoUrl, setVideoUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [citationHTML, setCitationHTML] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleGenerateCitation = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setCitationHTML('');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/generate-citation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: videoUrl }),
      });

      const data: CitationParts | { error: string } = await response.json();

      if (!response.ok || 'error' in data) {
        throw new Error((data as { error: string }).error || 'An unknown error occurred.');
      }

      const formatted = formatCitationHTML(data as CitationParts);
      setCitationHTML(formatted);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      const blob = new Blob([citationHTML], { type: 'text/html' });
      const item = new ClipboardItem({ 'text/html': blob });
      await navigator.clipboard.write([item]);
      setCopied(true);
    } catch (err) {
      console.error('Failed to copy HTML to clipboard. Falling back to plaintext:', err);
      await navigator.clipboard.writeText(stripMarkdown(citationHTML));
      setCopied(true);
    }
  };

  return (
    <div className="min-h-screen bg-lightBackground text-lightText dark:bg-darkBackground dark:text-darkText font-sans flex flex-col">
      <header className="w-full border-b border-grayBorderLight dark:border-grayBorderDark">
        <div className="max-w-3xl mx-auto py-4 px-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 flex-shrink-0">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <circle cx="24" cy="24" r="23" stroke="rgb(0 119 204 / 1)" strokeWidth="2" />
                <polygon points="20,16 32,24 20,32" fill="rgb(0 119 204 / 1)" />
                <path d="M14 36H34V38H14V36ZM14 32H34V34H14V32Z" fill="rgb(0 119 204 / 1)" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-academicBlue">CiteMatic</span>
              <span className="text-sm text-graySecondary">Cite your videos. Effortlessly.</span>
            </div>
          </div>

          {mounted ? (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="flex items-center space-x-2 text-sm bg-transparent border border-grayBorderLight dark:border-grayBorderDark px-3 py-1 rounded"
            >
              <span>{theme === 'dark' ? '☀️' : '🌙'}</span>
              <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
          ) : (
            <div className="w-[130px] h-[36px] bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
          )}
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center px-4">
        <div className="max-w-lg w-full p-6 mt-10 bg-lightSurface dark:bg-darkSurface rounded shadow-sm border border-grayBorderLight dark:border-grayBorderDark">
          <h1 className="text-2xl font-semibold mb-4 text-academicBlue">Generate APA Reference</h1>
          <form onSubmit={handleGenerateCitation} className="mb-4">
            <label htmlFor="videoUrl" className="block mb-2 text-sm">
              Paste a YouTube video URL:
            </label>
            <input
              id="videoUrl"
              type="url"
              required
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="https://youtube.com/..."
              className="w-full p-3 rounded border border-grayBorderLight dark:border-grayBorderDark bg-white dark:bg-darkBackground dark:text-darkText focus:outline-none focus:ring-2 focus:ring-academicBlue mb-4"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-academicBlue text-white font-medium rounded hover:opacity-90 disabled:opacity-60"
            >
              {loading ? 'Generating…' : 'Generate APA Reference'}
            </button>
          </form>

          {error && (
            <div className="text-red-500 text-sm mb-4" role="alert">
              {error}
            </div>
          )}

          {citationHTML && (
            <div className="bg-lightSurface dark:bg-darkSurface border border-grayBorderLight dark:border-grayBorderDark rounded p-4">
              <p className="text-sm text-graySecondary mb-2">Your APA Citation:</p>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div
                dangerouslySetInnerHTML={{ __html: citationHTML }}
              />
                <button
                  onClick={handleCopy}
                  className="text-sm px-3 py-1 bg-academicBlue text-white rounded hover:opacity-90 whitespace-nowrap"
                >
                  {copied ? 'Copied!' : 'Copy to Clipboard'}
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="w-full border-t border-grayBorderLight dark:border-grayBorderDark py-4 text-center text-sm text-graySecondary">
        © {new Date().getFullYear()} CiteMatic. All rights reserved.
      </footer>
    </div>
  );
}
