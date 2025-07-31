# EXTENDING.md

## Adding a New News Source

1. **Edit `pages/api/news.js`:**
   - Add a new entry to the `SOURCES` array with:
     - `id`: unique string
     - `name`: display name
     - `docs`: docs URL
     - `apiKeyEnv`: environment variable for the API key (or null)
     - `fetchUrl`: function to build the API URL
     - `supportsQuery`: true/false if the API supports keyword search
   - Add a normalization block for the new source in the handler function.

2. **Update `.env.local` (if needed):**
   - Add your new API key as an environment variable.

3. **No UI changes needed:**
   - The frontend automatically lists all sources from `/api/news`.
   - The search bar and article grid work for any normalized source.

4. **Document the new source:**
   - Add it to `docs/NEWS_SOURCES.md`.

5. **Test:**
   - Restart the dev server and verify the new source appears and returns articles. 