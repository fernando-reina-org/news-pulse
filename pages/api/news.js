// /pages/api/news.js
// News API aggregator endpoint

const SOURCES = [
  {
    id: 'marketaux',
    name: 'Marketaux',
    docs: 'https://www.marketaux.com',
    apiKeyEnv: 'MARKETAUX_API_KEY',
    fetchUrl: (query) => `https://api.marketaux.com/v1/news/all?language=en&api_token=${process.env.MARKETAUX_API_KEY}&${query}`,
    supportsQuery: true,
  },
  {
    id: 'newsapi',
    name: 'NewsAPI',
    docs: 'https://newsapi.org',
    apiKeyEnv: 'NEWSAPI_API_KEY',
    fetchUrl: (query) => `https://newsapi.org/v2/top-headlines?language=en&apiKey=${process.env.NEWSAPI_API_KEY}&${query}`,
    supportsQuery: true,
  },
  {
    id: 'mediastack',
    name: 'Mediastack',
    docs: 'https://mediastack.com',
    apiKeyEnv: 'MEDIASTACK_API_KEY',
    fetchUrl: (query) => `http://api.mediastack.com/v1/news?access_key=${process.env.MEDIASTACK_API_KEY}&languages=en&${query}`,
    supportsQuery: true,
  },
  {
    id: 'worldnewsapi',
    name: 'World News API',
    docs: 'https://worldnewsapi.com',
    apiKeyEnv: 'WORLDNEWSAPI_API_KEY',
    fetchUrl: (query) => `https://api.worldnewsapi.com/search-news?api-key=${process.env.WORLDNEWSAPI_API_KEY}&language=en&${query}`,
    supportsQuery: true,
  },
  {
    id: 'freenewsapi',
    name: 'FreeNewsAPI',
    docs: 'https://www.freenewsapi.com',
    apiKeyEnv: null,
    fetchUrl: (query) => `https://www.freenewsapi.com/l/english`,
    supportsQuery: false,
  },
  {
    id: 'gnews',
    name: 'GNews',
    docs: 'https://gnews.io',
    apiKeyEnv: 'GNEWS_API_KEY',
    fetchUrl: (query) => `https://gnews.io/api/v4/top-headlines?lang=en&token=${process.env.GNEWS_API_KEY}&${query}`,
    supportsQuery: true,
  },
  {
    id: 'newsapiai',
    name: 'NewsAPI.ai',
    docs: 'https://newsapi.ai',
    apiKeyEnv: 'NEWSAPIAI_API_KEY',
    fetchUrl: (query) => `https://eventregistry.org/api/v1/article/getArticles?resultType=articles&lang=eng&apiKey=${process.env.NEWSAPIAI_API_KEY}&${query}`,
    supportsQuery: true,
  },
];

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // List sources
    if (!req.query.source) {
      return res.status(200).json({ sources: SOURCES.map(({id, name, docs}) => ({id, name, docs})) });
    }
    // Fetch news from a source
    const { source, q } = req.query;
    const src = SOURCES.find(s => s.id === source);
    if (!src) return res.status(400).json({ error: 'Unknown source' });
    let url = src.fetchUrl(src.supportsQuery && q ? `q=${encodeURIComponent(q)}` : '');
    try {
      const response = await fetch(url);
      const data = await response.json();
      // Normalize articles for frontend
      let articles = [];
      if (src.id === 'marketaux') {
        articles = data.data?.map(a => ({
          title: a.title,
          url: a.url,
          description: a.description,
          image: a.image_url,
          publishedAt: a.published_at,
          source: a.source?.name,
        })) || [];
      } else if (src.id === 'newsapi') {
        articles = data.articles?.map(a => ({
          title: a.title,
          url: a.url,
          description: a.description,
          image: a.urlToImage,
          publishedAt: a.publishedAt,
          source: a.source?.name,
        })) || [];
      } else if (src.id === 'mediastack') {
        articles = data.data?.map(a => ({
          title: a.title,
          url: a.url,
          description: a.description,
          image: a.image,
          publishedAt: a.published_at,
          source: a.source,
        })) || [];
      } else if (src.id === 'worldnewsapi') {
        articles = data.news?.map(a => ({
          title: a.title,
          url: a.url,
          description: a.text,
          image: a.image,
          publishedAt: a.published,
          source: a.source_country,
        })) || [];
      } else if (src.id === 'freenewsapi') {
        articles = data.map(a => ({
          title: a.title,
          url: a.url,
          description: '',
          image: a.image ? a.url + '/image' : null,
          publishedAt: a.sec ? new Date(a.sec * 1000).toISOString() : null,
          source: a.domain,
        })) || [];
      } else if (src.id === 'gnews') {
        articles = data.articles?.map(a => ({
          title: a.title,
          url: a.url,
          description: a.description,
          image: a.image,
          publishedAt: a.publishedAt,
          source: a.source?.name,
        })) || [];
      } else if (src.id === 'newsapiai') {
        articles = data.articles?.results?.map(a => ({
          title: a.title,
          url: a.url,
          description: a.body,
          image: a.image,
          publishedAt: a.date,
          source: a.source?.title,
        })) || [];
      }
      return res.status(200).json({ articles });
    } catch (e) {
      return res.status(500).json({ error: 'Failed to fetch news', details: e.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
} 