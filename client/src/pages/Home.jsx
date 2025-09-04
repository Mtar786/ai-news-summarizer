import React, { useState, useEffect } from 'react';
import ArticleList from '../components/ArticleList.jsx';
import { fetchNews } from '../api.js';
import useLocalStorage from '../hooks/useLocalStorage.js';

function Home() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [favorites, setFavorites] = useLocalStorage('favorites', []);

  const categories = [
    { value: '', label: 'All' },
    { value: 'technology', label: 'Technology' },
    { value: 'business', label: 'Business' },
    { value: 'sports', label: 'Sports' },
    { value: 'science', label: 'Science' },
    { value: 'health', label: 'Health' },
    { value: 'entertainment', label: 'Entertainment' },
  ];

  // Fetch news when component mounts or when query/category change
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await fetchNews(query, category);
        setArticles(data);
      } catch (err) {
        console.error(err);
        setError('Failed to load news.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [query, category]);

  // Save article to favorites
  const handleSave = (article) => {
    // Avoid duplicates
    if (!favorites.some((fav) => fav.url === article.url)) {
      setFavorites([...favorites, article]);
    }
  };

  // Handle search form submit
  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    setQuery(formData.get('search') || '');
  };

  return (
    <div>
      <form onSubmit={handleSearch} className="mb-6 flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
        <input
          type="text"
          name="search"
          placeholder="Search..."
          defaultValue={query}
          className="w-full sm:flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {categories.map((cat) => (
            <option key={cat.value} value={cat.value}>{cat.label}</option>
          ))}
        </select>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Search
        </button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
        <ArticleList articles={articles} onSave={handleSave} />
      )}
    </div>
  );
}

export default Home;