import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import MovieList from '../components/MovieList';
import MovieCardSkeleton from '../components/MovieCardSkeleton';
import Error from '../components/Error';
import Pagination from '../components/Pagination';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useMovieSearch } from '../hooks/useMovieSearch';

const MAX_HISTORY_ITEMS = 5;

export default function Home() {
  const { movies, loading, error, totalResults, currentPage, totalPages, searchQuery, search, goToPage, clearResults } = useMovieSearch();
  const [hasSearched, setHasSearched] = useState(false);
  const [searchHistory, setSearchHistory] = useLocalStorage('searchHistory', []);

  const handleSearch = async (query) => {
    if (!query || query === searchQuery) return;
    
    setHasSearched(true);
    await search(query, 1); // Always start from page 1 on new search
    
    // Add to search history
    setSearchHistory((prev) => {
      const filtered = prev.filter((item) => item.toLowerCase() !== query.toLowerCase());
      return [query, ...filtered].slice(0, MAX_HISTORY_ITEMS);
    });
  };

  const handlePageChange = (page) => {
    goToPage(page);
  };

  const handleHistoryClick = (query) => {
    handleSearch(query);
  };

  const handleClearHistory = () => {
    setSearchHistory([]);
  };

  const handleRetry = () => {
    if (searchQuery) {
      handleSearch(searchQuery);
    }
  };

  const handleClearSearch = () => {
    clearResults();
    setHasSearched(false);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-6 sm:mb-8 text-slate-900 dark:text-white">Discover Movies</h1>
      
      <SearchBar onSearch={handleSearch} loading={loading} />

      {/* Search History */}
      {!hasSearched && searchHistory.length > 0 && (
        <div className="max-w-3xl mx-auto mb-6 sm:mb-8 bg-white dark:bg-gray-800 rounded-lg p-4 border border-slate-200 dark:border-gray-700 shadow-sm">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-semibold text-slate-600 dark:text-gray-400">Recent Searches</h3>
            <button
              onClick={handleClearHistory}
              className="text-xs text-slate-500 hover:text-slate-700 dark:hover:text-gray-300 transition-colors min-h-[44px] px-2 flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
            >
              Clear History
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {searchHistory.map((query, index) => (
              <button
                key={index}
                onClick={() => handleHistoryClick(query)}
                className="px-3 py-1.5 bg-slate-100 dark:bg-gray-700 hover:bg-slate-200 dark:hover:bg-gray-600 rounded-full text-sm transition-colors min-h-[44px] flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 active:scale-95 text-slate-900 dark:text-white"
              >
                {query}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Loading State with Skeleton Loaders */}
      {loading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-5">
          {Array.from({ length: 8 }).map((_, index) => (
            <MovieCardSkeleton key={index} />
          ))}
        </div>
      )}

      {/* Error State */}
      {!loading && error && (
        <Error 
          message={error.message} 
          error={error}
          onRetry={handleRetry}
        />
      )}

      {/* Welcome State */}
      {!loading && !error && !hasSearched && (
        <div className="text-center py-12">
          <div className="text-5xl sm:text-6xl mb-4">🎬</div>
          <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-slate-900 dark:text-white">Welcome to MovieSearch</h2>
          <p className="text-slate-600 dark:text-gray-400 mb-4 text-sm sm:text-base">
            Search for your favorite movies above to get started
          </p>
          <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg p-4 mt-6 border border-slate-200 dark:border-gray-700 shadow-md shadow-slate-200/50 dark:shadow-black/20">
            <p className="text-sm text-slate-600 dark:text-gray-400 mb-2">💡 Tips:</p>
            <ul className="text-sm text-slate-600 dark:text-gray-400 text-left space-y-1">
              <li>• Enter at least 3 characters to search</li>
              <li>• Try searching for "Batman", "Avengers", or "Star Wars"</li>
              <li>• Click on any movie to see full details</li>
              <li>• Add movies to your favorites for quick access</li>
            </ul>
          </div>
        </div>
      )}

      {/* Results with Total Count */}
      {!loading && !error && hasSearched && (
        <>
          {totalResults > 0 && (
            <div className="text-center mb-6">
              <p className="text-lg sm:text-xl text-slate-900 dark:text-white">
                Found <span className="text-blue-600 dark:text-blue-400 font-bold">{totalResults}</span> movies
                {searchQuery && (
                  <span className="text-slate-700 dark:text-gray-300"> for "{searchQuery}"</span>
                )}
              </p>
              <button
                onClick={handleClearSearch}
                className="mt-2 text-sm text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-colors min-h-[44px] px-4 flex items-center mx-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded active:scale-95"
              >
                Clear Search
              </button>
            </div>
          )}
          <MovieList 
            movies={movies} 
            totalResults={totalResults}
            currentPage={currentPage}
          />
          {totalResults > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalResults={totalResults}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
}
