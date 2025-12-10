import { useState, useEffect } from 'react';

/**
 * Pagination component for navigating through search results
 * @param {number} currentPage - Current active page
 * @param {number} totalPages - Total number of pages
 * @param {number} totalResults - Total number of results
 * @param {function} onPageChange - Callback when page changes
 * @param {number} siblingCount - Number of page buttons to show on each side of current page
 */
export default function Pagination({
  currentPage,
  totalPages,
  totalResults,
  onPageChange,
  siblingCount = 1
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft' && currentPage > 1) {
        onPageChange(currentPage - 1);
      } else if (e.key === 'ArrowRight' && currentPage < totalPages) {
        onPageChange(currentPage + 1);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentPage, totalPages, onPageChange]);

  if (totalPages <= 1) {
    return null;
  }

  const getPageNumbers = () => {
    const pages = [];
    const leftSibling = Math.max(currentPage - siblingCount, 1);
    const rightSibling = Math.min(currentPage + siblingCount, totalPages);

    const showLeftDots = leftSibling > 2;
    const showRightDots = rightSibling < totalPages - 1;

    // Always show first page
    pages.push(1);

    // Show left dots if needed
    if (showLeftDots) {
      pages.push('left-dots');
    }

    // Show sibling pages
    for (let i = leftSibling; i <= rightSibling; i++) {
      if (i !== 1 && i !== totalPages) {
        pages.push(i);
      }
    }

    // Show right dots if needed
    if (showRightDots) {
      pages.push('right-dots');
    }

    // Always show last page if there's more than one page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const handlePageClick = (page) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const resultsStart = ((currentPage - 1) * 10) + 1;
  const resultsEnd = Math.min(currentPage * 10, totalResults);

  // Mobile view - simplified pagination
  if (isMobile) {
    return (
      <div className="flex flex-col items-center gap-4 mt-8 mb-6">
        <div className="flex items-center gap-2">
          <button
            onClick={() => handlePageClick(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-2 rounded-lg font-medium transition-colors min-h-[44px] ${
              currentPage === 1
                ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 active:scale-95'
            }`}
            aria-label="Previous page"
          >
            ‹ Prev
          </button>
          
          <div className="px-4 py-2 text-gray-900 dark:text-white text-sm">
            Page <span className="font-bold">{currentPage}</span> of <span className="font-bold">{totalPages}</span>
          </div>
          
          <button
            onClick={() => handlePageClick(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-2 rounded-lg font-medium transition-colors min-h-[44px] ${
              currentPage === totalPages
                ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 active:scale-95'
            }`}
            aria-label="Next page"
          >
            Next ›
          </button>
        </div>
        
        <div className="text-gray-600 dark:text-gray-400 text-xs">
          Showing {resultsStart}-{resultsEnd} of {totalResults} results
        </div>
      </div>
    );
  }

  // Desktop view - full pagination
  const pageNumbers = getPageNumbers();

  return (
    <div className="flex flex-col items-center gap-4 mt-8 mb-6">
      <div className="flex items-center gap-1 sm:gap-2 flex-wrap justify-center">
        {/* First Page Button */}
        <button
          onClick={() => handlePageClick(1)}
          disabled={currentPage === 1}
          className={`px-2 sm:px-3 py-2 rounded-lg transition-colors min-h-[44px] ${
            currentPage === 1
              ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 active:scale-95'
          }`}
          aria-label="First page"
          title="First page"
        >
          «
        </button>

        {/* Previous Button */}
        <button
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-2 sm:px-3 py-2 rounded-lg transition-colors min-h-[44px] ${
            currentPage === 1
              ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 active:scale-95'
          }`}
          aria-label="Previous page"
          title="Previous page"
        >
          ‹
        </button>

        {/* Page Numbers */}
        {pageNumbers.map((page, index) => {
          if (page === 'left-dots' || page === 'right-dots') {
            return (
              <span
                key={`dots-${index}`}
                className="px-2 text-gray-500 dark:text-gray-500"
                aria-hidden="true"
              >
                ...
              </span>
            );
          }

          return (
            <button
              key={page}
              onClick={() => handlePageClick(page)}
              className={`px-3 sm:px-4 py-2 rounded-lg transition-colors min-h-[44px] ${
                page === currentPage
                  ? 'bg-blue-600 text-white font-bold'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 active:scale-95'
              }`}
              aria-label={`Page ${page}`}
              aria-current={page === currentPage ? 'page' : undefined}
            >
              {page}
            </button>
          );
        })}

        {/* Next Button */}
        <button
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-2 sm:px-3 py-2 rounded-lg transition-colors min-h-[44px] ${
            currentPage === totalPages
              ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 active:scale-95'
          }`}
          aria-label="Next page"
          title="Next page"
        >
          ›
        </button>

        {/* Last Page Button */}
        <button
          onClick={() => handlePageClick(totalPages)}
          disabled={currentPage === totalPages}
          className={`px-2 sm:px-3 py-2 rounded-lg transition-colors min-h-[44px] ${
            currentPage === totalPages
              ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 active:scale-95'
          }`}
          aria-label="Last page"
          title="Last page"
        >
          »
        </button>
      </div>

      {/* Results Info */}
      <div className="text-gray-600 dark:text-gray-400 text-sm">
        Showing {resultsStart}-{resultsEnd} of {totalResults} results
      </div>
    </div>
  );
}
