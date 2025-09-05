# AI News Summarizer Web App

This repository contains a simple full‑stack project that fetches news articles from a public news API, generates short AI‑powered summaries, and displays them in a modern web interface.  It's designed as a self‑contained example that you can easily run locally or deploy to a free hosting service (e.g. Render, Vercel, Netlify) and showcase on your GitHub profile.

## ✨ Features

* **Latest news** – Retrieve the most recent headlines across multiple categories using a free news API.
* **AI summaries** – Generate concise summaries of articles using an AI model (the code is written to integrate with OpenAI, but you can swap in any summarisation service).  If you don't provide an API key the server falls back to a simple first‑paragraph summariser.
* **Categories** – Filter stories by topic (technology, business, sports, and more).
* **Favorites** – Save articles to your favourites list and persist them to the browser's local storage.
* **Fully responsive** – Built with [React](https://react.dev/) and [Tailwind CSS](https://tailwindcss.com/) using [Vite](https://vitejs.dev/) for a lightning‑fast development experience.  Works on desktop and mobile.
* **Express API** – A small [Node.js](https://nodejs.org/) and [Express](https://expressjs.com/) backend acts as a proxy to hide API keys and perform summarisation.

## 🏗️ Repository structure

```
ai-news-summarizer/
 ├─ client/                # React frontend (Vite)
 │  ├─ src/
 │  │  ├─ components/      # Reusable UI components
 │  │  ├─ pages/           # Route components (Home, Favorites)
 │  │  ├─ App.jsx          # Application root with routing
 │  │  └─ main.jsx         # Entry point
 │  ├─ index.html          # HTML template used by Vite
 │  ├─ package.json        # Client dependencies and scripts
 │  └─ vite.config.js      # Vite configuration
 ├─ server/
 │  ├─ routes/
 │  │  └─ news.js          # Defines API endpoints for news and summarisation
 │  ├─ index.js            # Express server entry point
 │  ├─ package.json        # Server dependencies and scripts
 │  └─ .env.example        # Example environment variables
 ├─ .gitignore             # Ignore files for both frontend and backend
 └─ README.md              # Project documentation (this file)
```

## 🚀 Getting started

### Prerequisites

* [Node.js](https://nodejs.org/) v18 or later
* A news API key (for example from [NewsAPI](https://newsapi.org/) or [GNews](https://gnews.io/))
* Optionally an [OpenAI API key](https://openai.com/api) for generating summaries

### Installation

1. **Clone** this repository or download the ZIP.

   ```bash
   git clone https://github.com/yourusername/ai-news-summarizer.git
   cd ai-news-summarizer
   ```

2. **Server setup**

   ```bash
   cd server
   npm install
   cp .env.example .env
   # Edit .env to include your API keys
   # OPENAI_API_KEY=your_openai_api_key
   # NEWS_API_KEY=your_news_api_key
   # Optional: change NEWS_API_URL if you're using a different news service
   ```

   To start the backend:

   ```bash
   npm start
   ```

   The server will run on `http://localhost:5000` by default.

3. **Client setup**

   In a new terminal window:

   ```bash
   cd client
   npm install
   npm run dev
   ```

   Vite will launch the frontend at `http://localhost:5173`.  It automatically proxies API calls to the backend.

4. **Explore**

   Open your browser at `http://localhost:5173`.  Browse the latest headlines, click to view summaries, and save your favourites.  Feel free to tweak the UI, add themes, or integrate more categories!

## 🧠 How it works

* **Backend** – The Express server exposes two endpoints:

  * `GET /api/news` accepts a query and category and fetches stories from the configured news API.  It returns a list of articles with titles, descriptions, URLs and images.
  * `POST /api/summarize` accepts an article URL and uses the OpenAI API (if configured) to generate a short summary.  Without an API key it falls back to returning the first few sentences of the article description.

* **Frontend** – The React app fetches data from these endpoints and presents it in cards.  When you click an article card it loads the summary via the API.  Favourites are stored in localStorage so they persist between sessions.

## 🛠️ Customising

* **Change news source** – The `NEWS_API_URL` environment variable in the server `.env` file points to `https://newsapi.org/v2/top-headlines` by default.  You can replace it with another provider (e.g. `https://gnews.io/api/v4/top-headlines`).  Adjust the parameters in `server/routes/news.js` accordingly.
* **Use a different summarisation model** – The summarisation function is designed to work with OpenAI's `/v1/chat/completions` endpoint, but it's written in an easily replaceable way.  Feel free to plug in your own summariser or even call out to a Python microservice.
* **Deploy** – To deploy this project, run `npm run build` inside the `client` directory and host the static files on any platform (Netlify, Vercel, etc.).  Point the API requests to your deployed backend or use serverless functions.

## 📄 License

This project is licensed under the MIT License.  Feel free to use it, modify it, and distribute it as you wish.  Contributions are welcome – just open a pull request!
