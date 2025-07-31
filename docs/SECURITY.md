# SECURITY.md

## API Keys
- Store all API keys in `.env.local` (never commit to git)
- In production, set environment variables securely (e.g., Vercel dashboard)
- Never expose API keys to the frontend; all requests to news APIs are proxied through `/api/news`

## External Requests
- The backend fetches data from third-party APIs; handle errors gracefully
- Rate limits may apply—see each provider's docs
- Do not log sensitive data or API keys

## CORS
- All external API calls are made server-side, so CORS is not an issue for the frontend

## User Input
- The search query is passed as a query string to external APIs; always encode user input 