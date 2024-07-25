import React from "react";

interface TheadProps {
  headers: string[];
  title: string;
  search: string;
  onChangeSearch: (value: string) => void;
}

const Thead: React.FC<TheadProps> = ({
  headers,
  title,
  search,
  onChangeSearch,
}) => {
  return (
    <thead className="bg-white text-[#181818] border-b-[3px] border-[#EFF2F5] text-base">
      <tr>
        <th
          colSpan={headers.length}
          className="p-4 text-left font-semibold text-xl"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-[#2d5bff]">{title}</h2>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                name="search"
                id="search"
                className="border w-96 p-3 ps-10 text-base border-gray-300 outline-none rounded-md font-normal focus:border-[#2d5bff]"
                placeholder="Pesquisar..."
                value={search}
                onChange={(e) => onChangeSearch(e.target.value)}
              />
            </div>
          </div>
        </th>
      </tr>
      <tr className="text-left">
        {headers.map((header, index) => (
          <th
            key={index}
            scope="col"
            className="p-3 font-medium text-sm text-[#181818]"
          >
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default Thead;
