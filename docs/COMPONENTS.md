# COMPONENTS.md

## Home (pages/index.js)

### Description
The main React component for the News Pulse app. It displays the news source selector, search bar, and a grid of news articles. Uses Tailwind CSS for styling.

### State
- `sources`: Array of available news sources (fetched from `/api/news`).
- `selectedSource`: The currently selected news source ID.
- `articles`: Array of news articles for the selected source.
- `loading`: Boolean, true while fetching articles.
- `error`: Error message string, if any.
- `query`: Search query string.

### Behavior
- On mount, fetches the list of sources from `/api/news`.
- When a source is selected or the query changes, fetches articles from `/api/news?source=...&q=...`.
- Displays a loading indicator while fetching.
- Shows a message if no articles are found or if an error occurs.
- Renders a responsive grid of article cards, each linking to the original article.

### UI Elements
- **Source Selector**: Buttons for each news source.
- **Search Bar**: Input for keyword search.
- **API Docs Link**: Link to the selected source's documentation.
- **Article Grid**: Cards with title, description, image, source, and published date. 