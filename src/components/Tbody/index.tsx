import React, { ReactNode } from "react";

interface TbodyProps {
  data: (string | ReactNode)[][];
}

const Tbody: React.FC<TbodyProps> = ({ data }) => {
  return (
    <tbody>
      {data.map((row, rowIndex) => (
        <tr
          key={rowIndex}
          className="bg-white text-[#737373] border-b border-[#DEDEDE] text-sm hover:bg-[#f1f4ff] hover:cursor-pointer hover:transition-all"
        >
          {row.map((cell, cellIndex) => (
            <td key={cellIndex} className="p-3 text-[#181818]">
              {cell}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default Tbody;
