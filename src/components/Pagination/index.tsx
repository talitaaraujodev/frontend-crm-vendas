import React, { Fragment } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const generatePages = () => {
    const pages = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(currentPage - Math.floor(maxPagesToShow / 2), 1);
    let endPage = startPage + maxPagesToShow - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(endPage - maxPagesToShow + 1, 1);
    }

    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) {
        pages.push("...");
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push("...");
      }
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = generatePages();

  return (
    <div className="flex items-center justify-end mt-2 mb-1">
      <div className="flex items-center justify-end">
        <button
          className={`bg-[#eef2f7] flex rounded-full items-center justify-center px-1.5 mr-1 py-2 text-gray-600 hover:text-gray-800 transition-all ${
            currentPage === 1 ? "text-gray-400 cursor-not-allowed" : ""
          }`}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
        </button>

        {pages.map((page: any, index) => (
          <Fragment key={index}>
            {page === "..." ? (
              <span className="mx-2">...</span>
            ) : (
              <button
                className={`ml-1 min-w-8 min-h-8 ${
                  page === currentPage
                    ? "bg-[#466cf6] rounded-full text-white transition-all"
                    : "text-gray-500 hover:rounded-full transition-all hover:bg-[#eef2f7]"
                }`}
                onClick={() => onPageChange(page)}
              >
                {page}
              </button>
            )}
          </Fragment>
        ))}

        <button
          className={`flex bg-[#eef2f7] rounded-full items-center justify-center px-1.5 mx-2 py-2 text-gray-600 hover:text-gray-800 transition-all ${
            currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : ""
          }`}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
