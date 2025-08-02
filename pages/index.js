import { useEffect, useState } from 'react';

export default function Home() {
  const [sources, setSources] = useState([]);
  const [selectedSource, setSelectedSource] = useState(null);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetch('/api/news')
      .then(res => res.json())
      .then(data => setSources(data.sources || []));
  }, []);

  useEffect(() => {
    if (!selectedSource) return;
    setLoading(true);
    setError('');
    let url = `/api/news?source=${selectedSource}`;
    if (query) url += `&q=${encodeURIComponent(query)}`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setArticles(data.articles || []);
        setLoading(false);
      })
      .catch(e => {
        setError('Failed to fetch news');
        setLoading(false);
      });
  }, [selectedSource, query]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4">
      <div className="max-w-4xl mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4 text-center">News Pulse</h1>
        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {sources.map(src => (
            <button
              key={src.id}
              className={`px-4 py-2 rounded border text-sm font-medium transition-colors ${selectedSource === src.id ? 'bg-green-600 text-white' : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 hover:bg-blue-100 dark:hover:bg-green-800'}`}
              onClick={() => setSelectedSource(src.id)}
            >
              {src.name}
            </button>
          ))}
        </div>
        {selectedSource && (
          <div className="mb-6 flex flex-col sm:flex-row gap-2 items-center justify-center">
            <input
              type="text"
              className="w-full sm:w-64 px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Search news..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') setQuery(e.target.value); }}
            />
            <a
              href={sources.find(s => s.id === selectedSource)?.docs}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-500 hover:underline ml-2"
            >
              API Docs
            </a>
          </div>
        )}
        {loading && <div className="text-center py-8">Loading...</div>}
        {error && <div className="text-center text-red-500 py-4">{error}</div>}
        <div className="grid gap-6 md:grid-cols-2">
          {articles.map((a, i) => (
            <a
              key={i}
              href={a.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              {a.image && (
                <img src={a.image} alt={a.title} className="w-full h-48 object-cover" />
              )}
              <div className="p-4">
                <h2 className="font-semibold text-lg mb-1">{a.title}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{a.description}</p>
                <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                  <span>{a.source}</span>
                  <span>{a.publishedAt ? new Date(a.publishedAt).toLocaleString() : ''}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
        {!loading && articles.length === 0 && selectedSource && (
          <div className="text-center text-gray-500 py-8">No articles found.</div>
        )}
      </div>
    </div>
  );
}
