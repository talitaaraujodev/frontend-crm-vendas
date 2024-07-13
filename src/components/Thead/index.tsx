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
          className="p-4 text-left font-semibold text-xl "
        >
          <div className="flex items-center justify-between">
            <h2 className="text-[#2d5bff]">{title}</h2>
            <input
              type="search"
              name="search"
              id="search"
              className="border border-gray-300  outline-none rounded-md font-normal text-base p-2 w-4/12 focus:border-[#2d5bff]"
              placeholder="Buscar..."
              value={search}
              onChange={(e) => onChangeSearch(e.target.value)}
            />
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
