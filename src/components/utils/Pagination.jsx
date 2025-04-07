import React from 'react';

export const Pagination = ({ currentPage, totalPages, maxPageNumbersToShow, paginate, prevPage, nextPage }) => {
  
  const startPage = Math.max(1, currentPage - Math.floor(maxPageNumbersToShow / 2));
  const endPage = Math.min(totalPages, startPage + maxPageNumbersToShow - 1);

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="flex justify-center mt-4">
      <ul className="flex flex-wrap justify-center space-x-2">
        <li>
          <button
            onClick={prevPage}
            className="px-2 sm:px-4 py-1 sm:py-2 border rounded-lg bg-white text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={currentPage === 1}
          >
            Anterior
          </button>
        </li>
        {startPage > 1 && (
          <li>
            <button
              onClick={() => paginate(1)}
              className={`px-2 sm:px-4 py-1 sm:py-2 border rounded-lg transition-colors duration-300 ${currentPage === 1 ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
            >
              1
            </button>
          </li>
        )}
        {startPage > 2 && <li className="px-2 sm:px-4 py-1 sm:py-2">...</li>}
        {pageNumbers.map(number => (
          <li key={number}>
            <button
              onClick={() => paginate(number)}
              className={`px-2 sm:px-4 py-1 sm:py-2 border rounded-lg transition-colors duration-300 ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
            >
              {number}
            </button>
          </li>
        ))}
        {endPage < totalPages - 1 && <li className="px-2 sm:px-4 py-1 sm:py-2">...</li>}
        {endPage < totalPages && (
          <li>
            <button
              onClick={() => paginate(totalPages)}
              className={`px-2 sm:px-4 py-1 sm:py-2 border rounded-lg transition-colors duration-300 ${currentPage === totalPages ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
            >
              {totalPages}
            </button>
          </li>
        )}
        <li>
          <button
            onClick={nextPage}
            className="px-2 sm:px-4 py-1 sm:py-2 border rounded-lg bg-white text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={currentPage === totalPages}
          >
            Siguiente
          </button>
        </li>
      </ul>
    </nav>
  );
};
