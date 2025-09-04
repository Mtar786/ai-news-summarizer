import React, { useState } from 'react';
import axios from 'axios';

function ArticleCard({ article, onSave, showSaveButton = true }) {
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showFullSummary, setShowFullSummary] = useState(false);

  const handleSummarize = async () => {
    if (summary || loading) return;
    setLoading(true);
    setError('');
    try {
      const text = article.description || article.content || '';
      const response = await axios.post('/api/summarize', { text });
      setSummary(response.data.summary);
    } catch (err) {
      setError('Failed to fetch summary.');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    if (onSave) onSave(article);
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col">
      {article.urlToImage && (
        <img
          src={article.urlToImage}
          alt={article.title}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
      )}
      <h2 className="text-lg font-semibold mb-2">{article.title}</h2>
      <p className="text-sm text-gray-600 mb-4">
        {article.description || 'No description available.'}
      </p>
      {summary && (
        <div className="border-t pt-2 mt-2 text-sm">
          <strong>Summary:</strong> {summary}
        </div>
      )}
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <div className="mt-auto flex space-x-2">
        {showSaveButton && (
          <button
            onClick={handleSave}
            className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm"
          >
            Save
          </button>
        )}
        <button
          onClick={handleSummarize}
          className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded-md text-sm"
          disabled={loading || summary}
        >
          {loading ? 'Summarizing...' : summary ? 'Summarized' : 'Summarize'}
        </button>
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md text-sm"
        >
          Read More
        </a>
      </div>
    </div>
  );
}

export default ArticleCard;