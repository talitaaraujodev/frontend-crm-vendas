import React from "react";
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
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-end mt-2 mb-1">
      <div className="flex items-center justify-end">
        <button
          className={`flex items-center justify-center px-3 py-2 text-gray-500 ${
            currentPage === 1 ? "text-gray-400 cursor-not-allowed" : ""
          }`}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          <span>Anterior</span>
        </button>

        {pages.map((page) => (
          <button
            key={page}
            className={`ml-1 min-w-8 min-h-8 ${
              page === currentPage
                ? "bg-blue-400 rounded-full text-white transition-all"
                : "text-gray-500 hover:bg-gray-300 hover:rounded-full hover:text-gray-600"
            }`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}

        <button
          className={`flex items-center justify-center px-3 py-2 text-gray-500 hover:opacity-80 ${
            currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : ""
          }`}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <span>Próxima</span>
          <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
