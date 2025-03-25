import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const [videoUrl, setVideoUrl] = useState('');
  const [citation, setCitation] = useState('');

  // Fix hydration issues: wait until component is mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleGenerateCitation = (e: React.FormEvent) => {
    e.preventDefault();
    setCitation(`(Simulated) APA Reference for: ${videoUrl}`);
  };

  return (
    <div className="min-h-screen bg-lightBackground text-lightText dark:bg-darkBackground dark:text-darkText font-sans flex flex-col">
      {/* Header */}
      <header className="w-full border-b border-grayBorderLight dark:border-grayBorderDark">
        <div className="max-w-3xl mx-auto py-4 px-4 flex items-center justify-between">
          {/* Logo + Branding */}
          <div className="flex items-center space-x-3">
            {/* SVG Logo */}
            <div className="w-10 h-10 flex-shrink-0">
              <svg
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
              >
                <circle
                  cx="24"
                  cy="24"
                  r="23"
                  stroke="rgb(0 119 204 / var(--tw-bg-opacity, 1))"
                  strokeWidth="2"
                />
                <polygon
                  points="20,16 32,24 20,32"
                  fill="rgb(0 119 204 / var(--tw-bg-opacity, 1))"
                />
                <path
                  d="M14 36H34V38H14V36ZM14 32H34V34H14V32Z"
                  fill="rgb(0 119 204 / var(--tw-bg-opacity, 1))"
                />
              </svg>
            </div>

            {/* Textual Logo */}
            <div className="flex flex-col">
              <span className="text-xl font-bold text-academicBlue">CiteIt</span>
              <span className="text-sm text-graySecondary">Cite your videos. Effortlessly.</span>
            </div>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="text-sm bg-transparent border border-grayBorderLight dark:border-grayBorderDark px-3 py-1 rounded"
          >
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="flex-grow flex items-center justify-center px-4">
        <div className="max-w-lg w-full p-6 mt-10 bg-lightSurface dark:bg-darkSurface rounded shadow-sm border border-grayBorderLight dark:border-grayBorderDark">
          <h1 className="text-2xl font-semibold mb-4 text-academicBlue">
            Generate APA Reference
          </h1>
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
              className="w-full py-3 bg-academicBlue text-white font-medium rounded hover:opacity-90"
            >
              Generate APA Reference
            </button>
          </form>

          {citation && (
            <div className="bg-lightSurface dark:bg-darkSurface border border-grayBorderLight dark:border-grayBorderDark rounded p-4">
              <p className="text-sm text-graySecondary mb-1">Your APA Citation:</p>
              <p className="text-sm">{citation}</p>
            </div>
          )}
        </div>
      </main>

      <footer className="w-full border-t border-grayBorderLight dark:border-grayBorderDark py-4 text-center text-sm text-graySecondary">
        © {new Date().getFullYear()} CiteIt. All rights reserved.
      </footer>
    </div>
  );
}
