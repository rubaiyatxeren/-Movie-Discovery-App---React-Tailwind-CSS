# 🎬 Movie Discovery App

A modern, feature-rich movie discovery application built with React that allows users to browse, search, and explore thousands of movies from the TMDB (The Movie Database) API.

<img width="1349" height="4381" alt="Screenshot 2025-12-25 at 23-27-53 react-movie-finder-app" src="https://github.com/user-attachments/assets/7ef1406b-927a-4960-bfe8-b27902543550" />


## ✨ Features

### 🎯 **Movie Discovery**
- **Trending Movies** - Discover what's currently popular
- **Popular Movies** - Browse all-time favorites
- **Top Rated** - See the highest-rated films
- **Upcoming** - Check out movies coming soon
- **Now Playing** - Find movies currently in theaters

### 🔍 **Smart Search**
- Real-time movie search with debouncing
- Instant results with movie details
- No results handling with helpful messages

### 🎨 **Modern UI/UX**
- Clean, responsive design
- Gradient animations and smooth transitions
- Movie cards with ratings, language, and release year
- Interactive category tabs
- Loading states with spinners

### 📱 **Responsive Design**
- Fully responsive across all devices
- Mobile-optimized layout
- Adaptive movie grids


## 🛠️ Tech Stack

- **React 18** - Frontend library
- **Vite** - Build tool and development server
- **TMDB API** - Movie data source
- **CSS/JavaScript** - Styling and interactivity
- **React Hooks** - State and lifecycle management

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- TMDB API key

### Steps to Run Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/rubaiyatxeren/-Movie-Discovery-App---React-Tailwind-CSS
   cd movie-discovery-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_TMDB_API_KEY=your_tmdb_api_key_here
   ```

4. **Get a TMDB API Key**
   - Visit [TMDB](https://www.themoviedb.org/)
   - Create an account
   - Go to Settings > API
   - Request an API key
   - Copy the key to your `.env` file

5. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
movie-discovery-app/
├── src/
│   ├── components/
│   │   ├── MovieCard.jsx      # Movie display component
│   │   ├── Search.jsx         # Search input component
│   │   └── Spinner.jsx        # Loading spinner component
│   ├── App.jsx                # Main application component
│   └── main.jsx               # Application entry point
├── public/
│   ├── hero-img.png           # Hero banner image
│   ├── search.svg             # Search icon
│   ├── Rating.svg             # Rating star icon
│   └── No-Poster.svg          # Default poster image
├── .env                       # Environment variables
├── .gitignore                 # Git ignore file
├── index.html                 # HTML template
├── package.json               # Dependencies and scripts
├── README.md                  # Documentation
└── vite.config.js            # Vite configuration
```

## 🔧 Key Components

### App.jsx
The main component that:
- Manages application state
- Handles API calls to TMDB
- Implements search with debouncing
- Controls category navigation
- Renders the entire UI

### MovieCard.jsx
Displays individual movie cards with:
- Movie poster
- Title
- Rating with star icon
- Release year
- Original language

### Search.jsx
Search input component with:
- Search icon
- Debounced input
- Real-time filtering

### Spinner.jsx
Loading animation component for:
- API call states
- Search loading
- Category switching

## 🌐 API Integration

The app uses TMDB API with the following endpoints:

```javascript
const API_ENDPOINTS = {
  discover: '/discover/movie',          // Popular movies
  search: '/search/movie',              // Search movies
  trending: '/trending/movie/week',     // Weekly trending
  upcoming: '/movie/upcoming',          // Upcoming releases
  topRated: '/movie/top_rated',         // Top rated movies
  nowPlaying: '/movie/now_playing',     // Currently playing
};
```

## 🎨 Styling Features

### Color Scheme
- **Primary**: Purple gradients (#8B5CF6 to #EC4899)
- **Background**: Dark theme for better movie display
- **Accents**: Orange, Yellow, Blue, Green, Purple for categories

### Interactive Elements
- Hover effects on movie cards
- Smooth transitions
- Gradient buttons
- Responsive grids


## 🔄 State Management

The app uses React hooks for state management:

```javascript
// Key states
const [searchTerm, setSearchTerm] = useState("");
const [movieList, setMovieList] = useState([]);
const [activeCategory, setActiveCategory] = useState("trending");
const [isLoading, setIsLoading] = useState(false);
```

## ⚡ Performance Optimizations

- **Debounced Search**: 500ms delay to prevent excessive API calls
- **Memoized Functions**: `useCallback` for expensive operations
- **Efficient Rendering**: Conditional rendering based on state
- **Image Optimization**: Proper image sizing and placeholders

## 🧪 Error Handling

- Network request failures
- Invalid API responses
- Empty search results
- Missing movie data

## 🚀 Deployment

### Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to Netlify
```bash
# Build the project
npm run build

# Deploy the dist folder to Netlify
```

## 📄 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_TMDB_API_KEY` | Your TMDB API key | ✅ |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 To-Do & Future Features

- [ ] User authentication
- [ ] Watchlist functionality
- [ ] Movie trailers integration
- [ ] Advanced filtering (genres, year, rating)
- [ ] Dark/light mode toggle
- [ ] Movie details modal
- [ ] User reviews and ratings
- [ ] Social sharing features

## 🐛 Troubleshooting

### Common Issues

1. **API Key Not Working**
   - Ensure your API key is correct
   - Check if the key has proper permissions
   - Verify the `.env` file is in the root directory

2. **Images Not Loading**
   - Check internet connection
   - Verify TMDB image URLs
   - Ensure CORS is properly configured

3. **Search Not Working**
   - Check browser console for errors
   - Verify API endpoint is correct
   - Ensure search term is properly encoded

## 📊 API Rate Limits

TMDB API has rate limits:
- 50 requests per 10 seconds
- 40 requests per 10 seconds for search endpoints

## 📚 Learning Resources

- [TMDB API Documentation](https://developers.themoviedb.org/3)
- [React Documentation](https://reactjs.org/docs)
- [Vite Documentation](https://vitejs.dev/guide/)


## 🙏 Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for providing the API
- [Unsplash](https://unsplash.com/) for images
- All contributors and users of this project

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

⭐ **If you found this project helpful, please give it a star!** ⭐

---

**Happy Movie Watching!** 🍿🎥
