import React from 'react';
import ArticleCard from './ArticleCard.jsx';

function ArticleList({ articles, onSave }) {
  if (!articles || articles.length === 0) {
    return <p>No articles found. Try adjusting your search or category.</p>;
  }
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article, idx) => (
        <ArticleCard key={idx} article={article} onSave={onSave} />
      ))}
    </div>
  );
}

export default ArticleList;