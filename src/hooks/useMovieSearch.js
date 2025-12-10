import { useState } from 'react';
import { searchMovies } from '../services/api';

/**
 * Custom hook that encapsulates movie search logic
 * @returns {Object} Search state and functions
 */
export function useMovieSearch() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const search = async (query, page = 1) => {
    setLoading(true);
    setError(null);
    setSearchQuery(query);
    setCurrentPage(page);

    try {
      const result = await searchMovies(query, page);
      
      if (result.success) {
        setMovies(result.movies);
        setTotalResults(result.totalResults);
        setTotalPages(result.totalPages);
      } else {
        setError(result.error);
        setMovies([]);
        setTotalResults(0);
        setTotalPages(0);
      }
    } catch (err) {
      setError({
        type: 'NETWORK_ERROR',
        message: err.message || 'An unexpected error occurred'
      });
      setMovies([]);
      setTotalResults(0);
      setTotalPages(0);
    } finally {
      setLoading(false);
    }
  };

  const goToPage = async (page) => {
    if (searchQuery && page >= 1 && page <= totalPages) {
      // Scroll to top of results
      window.scrollTo({ top: 0, behavior: 'smooth' });
      await search(searchQuery, page);
    }
  };

  const clearResults = () => {
    setMovies([]);
    setError(null);
    setTotalResults(0);
    setCurrentPage(1);
    setTotalPages(0);
    setSearchQuery('');
  };

  return {
    movies,
    loading,
    error,
    totalResults,
    currentPage,
    totalPages,
    searchQuery,
    search,
    goToPage,
    clearResults
  };
}
