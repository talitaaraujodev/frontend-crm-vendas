import React from "react";

interface TheadProps {
  headers: string[];
  title: string;
}

const Thead: React.FC<TheadProps> = ({ headers, title }) => {
  return (
    <thead className="bg-white text-[#181818] border-b-[3px] border-[#EFF2F5] text-base">
      <tr>
        <th
          colSpan={headers.length}
          className="p-4 text-left font-semibold text-xl"
        >
          <h2 className="text-[#2d5bff]">{title}</h2>
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
