import { useState, useMemo, useCallback } from 'react';

export function useMovieFilters(movies) {
  const [sortBy, setSortBy] = useState('year');
  const [sortOrder, setSortOrder] = useState('desc');
  const [filterType, setFilterType] = useState('all');
  const [yearFrom, setYearFrom] = useState('');
  const [yearTo, setYearTo] = useState('');

  const handleSortChange = useCallback((key, value) => {
    if (key === 'sortBy') setSortBy(value);
    if (key === 'sortOrder') setSortOrder(value);
  }, []);

  const handleFilterChange = useCallback((key, value) => {
    if (key === 'type') setFilterType(value);
    if (key === 'yearFrom') setYearFrom(value);
    if (key === 'yearTo') setYearTo(value);
  }, []);

  const clearFilters = useCallback(() => {
    setSortBy('year');
    setSortOrder('desc');
    setFilterType('all');
    setYearFrom('');
    setYearTo('');
  }, []);

  const filteredAndSortedMovies = useMemo(() => {
    let result = [...movies];

    // Filter by type
    if (filterType !== 'all') {
      result = result.filter(movie => 
        movie.Type?.toLowerCase() === filterType.toLowerCase()
      );
    }

    // Filter by year range
    if (yearFrom) {
      result = result.filter(movie => {
        const movieYear = parseInt(movie.Year);
        return !isNaN(movieYear) && movieYear >= parseInt(yearFrom);
      });
    }

    if (yearTo) {
      result = result.filter(movie => {
        const movieYear = parseInt(movie.Year);
        return !isNaN(movieYear) && movieYear <= parseInt(yearTo);
      });
    }

    // Sort
    result.sort((a, b) => {
      let comparison = 0;
      
      if (sortBy === 'year') {
        const yearA = parseInt(a.Year) || 0;
        const yearB = parseInt(b.Year) || 0;
        comparison = yearA - yearB;
      } else if (sortBy === 'title') {
        comparison = a.Title.localeCompare(b.Title);
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [movies, sortBy, sortOrder, filterType, yearFrom, yearTo]);

  return {
    sortBy,
    sortOrder,
    filterType,
    yearFrom,
    yearTo,
    handleSortChange,
    handleFilterChange,
    clearFilters,
    filteredMovies: filteredAndSortedMovies,
    filteredCount: filteredAndSortedMovies.length,
  };
}
