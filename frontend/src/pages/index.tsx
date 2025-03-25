import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This will later trigger the backend call
    console.log('Submitted URL:', url);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold mb-6">CiteIt 🎓</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <input
          type="url"
          placeholder="Paste a YouTube video URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded mb-4"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
        >
          Generate Citation
        </button>
      </form>
    </main>
  );
}
