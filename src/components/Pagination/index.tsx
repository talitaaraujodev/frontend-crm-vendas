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
          className={`bg-[#eef2f7] flex rounded-full items-center justify-center px-1.5 mr-1 py-2 text-gray-600 hover:text-gray-400 transition-all ${
            currentPage === 1 ? "text-gray-400 cursor-not-allowed" : ""
          }`}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="w-4 h-4 mr-1" />

        </button>

        {pages.map((page) => (
          <button
            key={page}
            className={`ml-1 min-w-8 min-h-8 ${
              page === currentPage
                ? "bg-blue-400 rounded-full text-white transition-all"
                : "text-gray-500 hover:rounded-full transition-all hover:bg-[#eef2f7]"
            }`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}

        <button
          className={`flex bg-[#eef2f7] rounded-full items-center justify-center px-1.5 mx-2 py-2 text-gray-600 hover:text-gray-400 transition-all ${
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
