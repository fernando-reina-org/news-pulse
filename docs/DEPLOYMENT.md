# DEPLOYMENT.md

## Deploying News Pulse

### Vercel (Recommended)
1. Push your code to GitHub, GitLab, or Bitbucket.
2. Go to https://vercel.com/import and import your repo.
3. In the Vercel dashboard, add the following environment variables (from your `.env.local`):
   - MARKETAUX_API_KEY
   - NEWSAPI_API_KEY
   - MEDIASTACK_API_KEY
   - WORLDNEWSAPI_API_KEY
   - GNEWS_API_KEY
   - NEWSAPIAI_API_KEY
4. Deploy!

### Other Platforms
- The app is a standard Next.js project and can be deployed to any Node.js host.
- Set environment variables as in `.env.local` on your host.
- Run `npm run build` and `npm start` for production.

### Notes
- You can leave out any API keys for sources you don't want to enable.
- For local development, use `.env.local` as described in the README. 