import React, { useCallback, useEffect, useState } from "react";
import { useDebounce } from "react-use";
import MovieCard from "./components/MovieCard";
import Search from "./components/Search";
import Spinner from "./components/Spinner";

const BASE_URL = "https://api.themoviedb.org/3";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_ENDPOINTS = {
  discover: `${BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`,
  search: (query) =>
    `${BASE_URL}/search/movie?query=${encodeURIComponent(
      query
    )}&api_key=${API_KEY}`,
  trending: `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`,
  upcoming: `${BASE_URL}/movie/upcoming?api_key=${API_KEY}`,
  topRated: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}`,
  nowPlaying: `${BASE_URL}/movie/now_playing?api_key=${API_KEY}`,
};

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("trending");
  const [categories, setCategories] = useState({
    trending: [],
    upcoming: [],
    topRated: [],
    nowPlaying: [],
    popular: [],
  });

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

  const fetchMovies = useCallback(
    async (query) => {
      setIsLoading(true);
      setErrorMessage("");
      try {
        let endpoint;
        if (query) {
          endpoint = API_ENDPOINTS.search(query);
        } else {
          endpoint =
            activeCategory === "popular"
              ? API_ENDPOINTS.discover
              : API_ENDPOINTS[activeCategory] || API_ENDPOINTS.trending;
        }

        console.log("Fetching from:", endpoint); // Debug log
        const response = await fetch(endpoint, API_OPTIONS);

        if (!response.ok) {
          throw new Error(
            `Failed to fetch movies (Status: ${response.status})`
          );
        }

        const data = await response.json();

        if (!data.results || data.results.length === 0) {
          setErrorMessage(
            query ? `No movies found for "${query}"` : "No movies found"
          );
          setMovieList([]);
        } else {
          setMovieList(data.results || []);
          setErrorMessage("");
        }

        console.log("Fetched movies:", data.results?.length || 0); // Debug log
      } catch (error) {
        console.error(`Error fetching movies: ${error}`);
        setErrorMessage(
          error.message || "Error fetching movies. Please try again later..."
        );
        setMovieList([]);
      } finally {
        setIsLoading(false);
      }
    },
    [activeCategory]
  );

  const fetchCategoryMovies = async (category) => {
    try {
      const response = await fetch(API_ENDPOINTS[category], API_OPTIONS);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${category} movies`);
      }
      const data = await response.json();
      return data.results || [];
    } catch (error) {
      console.error(`Error fetching ${category} movies:`, error);
      return [];
    }
  };

  const loadAllCategories = async () => {
    const categoryPromises = [
      { key: "trending", promise: fetchCategoryMovies("trending") },
      { key: "upcoming", promise: fetchCategoryMovies("upcoming") },
      { key: "topRated", promise: fetchCategoryMovies("topRated") },
      { key: "nowPlaying", promise: fetchCategoryMovies("nowPlaying") },
      { key: "popular", promise: fetchCategoryMovies("discover") },
    ];

    try {
      const results = await Promise.all(
        categoryPromises.map((item) => item.promise)
      );

      const newCategories = {};
      categoryPromises.forEach((item, index) => {
        newCategories[item.key] = results[index];
      });

      setCategories(newCategories);

      if (results[0] && results[0].length > 0) {
        setMovieList(results[0]);
      }
    } catch (error) {
      console.error("Error loading categories:", error);
    }
  };

  useEffect(() => {
    if (debouncedSearchTerm) {
      console.log("Searching for:", debouncedSearchTerm); // Debug log
      fetchMovies(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, fetchMovies]);

  useEffect(() => {
    if (!debouncedSearchTerm) {
      console.log("Loading category:", activeCategory); // Debug log
      fetchMovies();
    }
  }, [debouncedSearchTerm, activeCategory, fetchMovies]);

  useEffect(() => {
    loadAllCategories();
  }, [loadAllCategories]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setSearchTerm("");
    setDebouncedSearchTerm("");
  };

  const categoryConfig = {
    trending: { title: "🔥 Trending Now", color: "text-orange-500" },
    popular: { title: "⭐ Popular Movies", color: "text-yellow-500" },
    topRated: { title: "🏆 Top Rated", color: "text-blue-500" },
    upcoming: { title: "📅 Coming Soon", color: "text-green-500" },
    nowPlaying: { title: "🎬 Now Playing", color: "text-purple-500" },
  };

  return (
    <>
      <main>
        <div className="pattern">
          <div className="wrapper">
            <header className="">
              <img src="./hero-img.png" alt="Hero Banner" />
              <h1>
                Find <span className="text-gradient">Movies</span> You'll Enjoy
                Without The Hassle{" "}
              </h1>
              <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

              {/* Category Tabs */}
              {!debouncedSearchTerm && (
                <div className="category-tabs mt-8 flex flex-wrap gap-2 justify-center">
                  {Object.keys(categoryConfig).map((category) => (
                    <button
                      key={category}
                      onClick={() => handleCategoryChange(category)}
                      className={`px-4 py-2 rounded-full font-medium transition-all ${
                        activeCategory === category
                          ? `bg-gradient-to-r from-purple-600 to-pink-500 text-white`
                          : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                      }`}
                    >
                      {categoryConfig[category].title}
                    </button>
                  ))}
                </div>
              )}
            </header>

            <section className="all-movies">
              <h2 className="mt-[40px]">
                {debouncedSearchTerm ? (
                  `Search Results for "${debouncedSearchTerm}"`
                ) : (
                  <>
                    <span className={categoryConfig[activeCategory]?.color}>
                      {categoryConfig[activeCategory]?.title}
                    </span>
                  </>
                )}
              </h2>

              {isLoading ? (
                <Spinner />
              ) : errorMessage ? (
                <div className="text-center py-8">
                  <p className="text-red-500 text-lg">{errorMessage}</p>
                  {!debouncedSearchTerm && (
                    <button
                      onClick={() => fetchMovies()}
                      className="mt-4 px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-medium transition-colors"
                    >
                      Try Again
                    </button>
                  )}
                </div>
              ) : movieList.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-400 text-lg">
                    {debouncedSearchTerm
                      ? `No movies found for "${debouncedSearchTerm}"`
                      : "No movies found in this category."}
                  </p>
                </div>
              ) : debouncedSearchTerm ? (
                // Search Results
                <>
                  <p className="text-gray-400 mb-6">
                    Found {movieList.length} movie
                    {movieList.length !== 1 ? "s" : ""}
                  </p>
                  <ul className="movie-grid">
                    {movieList.map((movie) => (
                      <MovieCard key={movie.id} movie={movie} />
                    ))}
                  </ul>
                </>
              ) : (
                // Category Results with Featured Section
                <div className="category-results">
                  {/* Main Featured Movies */}
                  <div className="featured-section mb-12">
                    <ul className="movie-grid">
                      {movieList.slice(0, 8).map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                      ))}
                    </ul>
                  </div>

                  {/* Other Categories Preview (except the active one) */}
                  {Object.entries(categories).map(
                    ([category, movies]) =>
                      category !== activeCategory &&
                      movies.length > 0 && (
                        <div key={category} className="category-preview mb-12">
                          <div className="flex justify-between items-center mb-6">
                            <h3
                              className={`text-xl font-bold ${categoryConfig[category]?.color}`}
                            >
                              {categoryConfig[category]?.title}
                            </h3>
                            <button
                              onClick={() => handleCategoryChange(category)}
                              className="text-gray-400 hover:text-white text-sm font-medium transition-colors"
                            >
                              View All →
                            </button>
                          </div>
                          <ul className="movie-grid-small">
                            {movies.slice(0, 4).map((movie) => (
                              <MovieCard key={movie.id} movie={movie} />
                            ))}
                          </ul>
                        </div>
                      )
                  )}
                </div>
              )}
            </section>
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
