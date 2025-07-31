# News Pulse

A Next.js + Tailwind CSS app to browse news from multiple free news APIs. Easily switch between sources and search for articles.

## Features
- Aggregates news from 6+ popular free APIs (Marketaux, NewsAPI, Mediastack, World News API, FreeNewsAPI, GNews, NewsAPI.ai)
- Switch between sources with one click
- Search for news articles by keyword
- Responsive, modern UI with Tailwind CSS

## Getting Started

### 1. Install dependencies

```
npm install
```

### 2. Configure API Keys

Create a `.env.local` file in the project root and add your API keys:

```
# .env.local
MARKETAUX_API_KEY=your_marketaux_key
NEWSAPI_API_KEY=your_newsapi_key
MEDIASTACK_API_KEY=your_mediastack_key
WORLDNEWSAPI_API_KEY=your_worldnewsapi_key
GNEWS_API_KEY=your_gnews_key
NEWSAPIAI_API_KEY=your_newsapiai_key
```

- **FreeNewsAPI** does not require a key.
- You can leave any key blank if you don't want to use that source.
- Get free API keys from each provider's website (see the source selector for links).

### 3. Run the development server

```
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure
- `pages/index.js` — Main UI, source switcher, search, and article display
- `pages/api/news.js` — API aggregator for all news sources
- `styles/` — Tailwind CSS styles
- `docs/` — Component and service documentation (see below)

## Documentation
See the `docs/` folder for detailed documentation of each component and service.

## License
MIT
