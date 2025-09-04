import express from 'express';
import axios from 'axios';

const router = express.Router();

// Helper to fetch news articles from the configured provider
async function fetchNews({ query = '', category = '' }) {
  const apiKey = process.env.NEWS_API_KEY;
  const baseUrl = process.env.NEWS_API_URL || 'https://newsapi.org/v2/top-headlines';
  const country = process.env.NEWS_API_COUNTRY || '';

  if (!apiKey) {
    throw new Error('NEWS_API_KEY is not configured. Please set it in the .env file.');
  }

  const params = {};
  // News API uses `q` for search query, `category` for categories and `country` for localisation
  if (query) params.q = query;
  if (category) params.category = category;
  if (country) params.country = country;
  params.apiKey = apiKey;

  const url = baseUrl;
  const { data } = await axios.get(url, { params });
  // Return the articles array or an empty list
  return data.articles || [];
}

// Simple summarisation fallback: take the first two sentences or up to 60 words
function fallbackSummarise(text) {
  if (!text) return '';
  // Split text into sentences
  const sentences = text.split(/(?<=[.!?])\s+/);
  const summary = sentences.slice(0, 2).join(' ');
  // If summary is still too short, return the first 60 words
  if (summary.split(' ').length < 5) {
    return text.split(' ').slice(0, 60).join(' ') + '...';
  }
  return summary;
}

// POST summarisation using OpenAI API if key is present
async function aiSummarise(text) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return fallbackSummarise(text);
  }
  try {
    const payload = {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant that summarises news articles into concise bullet points.',
        },
        {
          role: 'user',
          content: `Summarise the following article into 2–3 sentences:\n\n${text}`,
        },
      ],
      max_tokens: 100,
      temperature: 0.5,
    };
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    };
    const response = await axios.post('https://api.openai.com/v1/chat/completions', payload, { headers });
    const choices = response.data.choices;
    if (choices && choices.length > 0) {
      return choices[0].message.content.trim();
    }
    return fallbackSummarise(text);
  } catch (error) {
    console.error('Error summarising with OpenAI:', error.message);
    return fallbackSummarise(text);
  }
}

// GET /api/news – Fetch latest headlines
router.get('/news', async (req, res) => {
  const { q = '', category = '' } = req.query;
  try {
    const articles = await fetchNews({ query: q, category });
    res.json({ articles });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// POST /api/summarize – Summarise an article description/text
router.post('/summarize', async (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: 'No text provided for summarisation.' });
  }
  try {
    const summary = await aiSummarise(text);
    res.json({ summary });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to summarise article.' });
  }
});

export default router;