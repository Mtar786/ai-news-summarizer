import React from 'react';
import useLocalStorage from '../hooks/useLocalStorage.js';
import ArticleCard from '../components/ArticleCard.jsx';

function Favorites() {
  const [favorites, setFavorites] = useLocalStorage('favorites', []);

  const handleRemove = (url) => {
    const updated = favorites.filter((fav) => fav.url !== url);
    setFavorites(updated);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Your Favorites</h2>
      {favorites.length === 0 ? (
        <p>You haven't saved any articles yet.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {favorites.map((article, idx) => (
            <div key={idx} className="relative">
              <ArticleCard article={article} showSaveButton={false} />
              <button
                onClick={() => handleRemove(article.url)}
                className="absolute top-2 right-2 px-2 py-1 text-xs bg-red-500 hover:bg-red-600 text-white rounded"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;