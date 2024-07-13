import React, { ReactNode } from "react";

interface TbodyProps {
  data: (string | ReactNode)[][];
  openViewModal: (agent: any) => void;
}

const Tbody: React.FC<TbodyProps> = ({ data, openViewModal }) => {
  return (
    <tbody>
      {data.map((row, rowIndex) => (
        <tr
          key={rowIndex}
          className="bg-white text-[#737373] border-b border-[#DEDEDE] text-sm hover:bg-[#f1f4ff] hover:cursor-pointer hover:transition-all"
        >
          {row.map((cell, cellIndex) => (
            <td
              key={cellIndex}
              className={`p-3 text-[#181818] ${
                cellIndex === 0
                  ? "hover:text-blue-700 hover:underline transition-all"
                  : ""
              }`}
              onClick={
                cellIndex === 0 ? () => openViewModal(row[0]) : undefined
              }
            >
              {cell}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default Tbody;
