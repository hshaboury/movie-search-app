import MovieCard from './MovieCard';

export default function MovieList({ movies, totalResults, currentPage = 1 }) {
  if (!movies || movies.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-600 dark:text-gray-400 text-lg">No movies found</p>
      </div>
    );
  }

  const resultsStart = ((currentPage - 1) * 10) + 1;
  
  // When displaying filtered results, show actual count instead of pagination-based count
  const actualResultsEnd = Math.min(resultsStart - 1 + movies.length, totalResults);

  return (
    <div className="animate-fadeIn">
      {/* Results Count Header */}
      {totalResults > 0 && (
        <div className="mb-6">
          <p className="text-slate-600 dark:text-gray-400 text-center text-sm sm:text-base">
            Showing <span className="text-slate-900 dark:text-white font-semibold">{resultsStart}-{actualResultsEnd}</span> of{' '}
            <span className="text-slate-900 dark:text-white font-semibold">{totalResults}</span> results
          </p>
        </div>
      )}
      
      {/* Movie Grid - Responsive: 2 cols (mobile), 3 cols (tablet), 4-5 cols (desktop) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-5">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  );
}
