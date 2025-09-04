import axios from 'axios';

/**
 * Fetch news articles from the backend.
 * @param {string} query Optional search term.
 * @param {string} category Optional category (e.g. technology, business).
 */
export async function fetchNews(query = '', category = '') {
  const params = {};
  if (query) params.q = query;
  if (category) params.category = category;
  const response = await axios.get('/api/news', { params });
  return response.data.articles || [];
}

/**
 * Summarise a given text via the backend.
 * @param {string} text The text to summarise.
 */
export async function summarizeText(text) {
  const response = await axios.post('/api/summarize', { text });
  return response.data.summary;
}