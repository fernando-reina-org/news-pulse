# API.md

## /api/news

### Description
Aggregates news from multiple external APIs. Lists available sources and fetches articles from the selected source, normalizing the response for the frontend.

### Methods
- `GET /api/news` — List all available news sources
- `GET /api/news?source=SOURCE_ID[&q=QUERY]` — Fetch articles from a specific source, optionally filtered by a search query

### Query Parameters
- `source` (string): The ID of the news source (see list below)
- `q` (string, optional): Search query/keywords (if supported by the source)

### Response
#### List sources
```
{
  "sources": [
    { "id": "marketaux", "name": "Marketaux", "docs": "https://www.marketaux.com" },
    ...
  ]
}
```

#### Fetch articles
```
{
  "articles": [
    {
      "title": "...",
      "url": "...",
      "description": "...",
      "image": "...",
      "publishedAt": "...",
      "source": "..."
    },
    ...
  ]
}
```

### Supported Sources
- `marketaux`
- `newsapi`
- `mediastack`
- `worldnewsapi`
- `freenewsapi`
- `gnews`
- `newsapiai`

### Normalization
The endpoint normalizes the different response formats from each API into a common article structure for the frontend. See the code for details on each mapping.

### Errors
- `400 Unknown source` — If the source ID is not recognized
- `500 Failed to fetch news` — If the external API call fails
- `405 Method not allowed` — For non-GET requests 