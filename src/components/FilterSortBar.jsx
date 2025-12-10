export default function FilterSortBar({ 
  sortBy, 
  sortOrder, 
  filterType, 
  yearFrom, 
  yearTo, 
  onSortChange, 
  onFilterChange, 
  onClear,
  totalResults,
  filteredCount 
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-slate-200 dark:border-gray-700 p-4 mb-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        
        {/* Sort Controls */}
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-slate-700 dark:text-gray-300">Sort:</label>
          <select
            value={sortBy}
            onChange={(e) => onSortChange('sortBy', e.target.value)}
            className="px-3 py-2 rounded-lg bg-slate-100 dark:bg-gray-700 text-slate-900 dark:text-white border border-slate-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="year">Year</option>
            <option value="title">Title</option>
          </select>
          <button
            onClick={() => onSortChange('sortOrder', sortOrder === 'asc' ? 'desc' : 'asc')}
            className="p-2 rounded-lg bg-slate-100 dark:bg-gray-700 hover:bg-slate-200 dark:hover:bg-gray-600 text-slate-700 dark:text-gray-300 border border-slate-300 dark:border-gray-600 transition-colors"
            aria-label={sortOrder === 'asc' ? 'Sort descending' : 'Sort ascending'}
          >
            {sortOrder === 'asc' ? '↑' : '↓'}
          </button>
        </div>

        {/* Type Filter */}
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-slate-700 dark:text-gray-300">Type:</label>
          <select
            value={filterType}
            onChange={(e) => onFilterChange('type', e.target.value)}
            className="px-3 py-2 rounded-lg bg-slate-100 dark:bg-gray-700 text-slate-900 dark:text-white border border-slate-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All</option>
            <option value="movie">Movies</option>
            <option value="series">Series</option>
            <option value="episode">Episodes</option>
          </select>
        </div>

        {/* Year Range Filter */}
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-slate-700 dark:text-gray-300">Year:</label>
          <input
            type="number"
            placeholder="From"
            value={yearFrom}
            onChange={(e) => onFilterChange('yearFrom', e.target.value)}
            className="w-20 px-3 py-2 rounded-lg bg-slate-100 dark:bg-gray-700 text-slate-900 dark:text-white border border-slate-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="1900"
            max="2030"
          />
          <span className="text-slate-500 dark:text-gray-400">-</span>
          <input
            type="number"
            placeholder="To"
            value={yearTo}
            onChange={(e) => onFilterChange('yearTo', e.target.value)}
            className="w-20 px-3 py-2 rounded-lg bg-slate-100 dark:bg-gray-700 text-slate-900 dark:text-white border border-slate-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="1900"
            max="2030"
          />
        </div>

        {/* Clear Button */}
        <button
          onClick={onClear}
          className="px-4 py-2 rounded-lg bg-slate-200 dark:bg-gray-700 hover:bg-slate-300 dark:hover:bg-gray-600 text-slate-700 dark:text-gray-300 text-sm font-medium transition-colors"
        >
          Clear Filters
        </button>
      </div>

      {/* Filtered Count */}
      {filteredCount !== totalResults && (
        <p className="mt-3 text-sm text-slate-600 dark:text-gray-400">
          Showing {filteredCount} of {totalResults} results
        </p>
      )}
    </div>
  );
}
