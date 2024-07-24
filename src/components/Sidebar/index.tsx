import { FilePlus, LucideRows4, ScrollText, UserRoundPlus } from "lucide-react";
import { Link } from "react-router-dom";

interface SidebarProps {
  openSidebar: boolean;
}

const Sidebar = ({ openSidebar }: SidebarProps) => {
  return (
    <div
      className={`h-full relative w-[240px] bg-[#f4f5f9] flex flex-col p-4 border-r-2 transition-all duration-300 ${
        openSidebar ? "ml-0" : "ml-[-240px]"
      }`}
    >
      <h3 className="text-[#181818] font-normal text-[0.875rem] uppercase px-2">
        Menu
      </h3>
      <ul className="pt-2">
        <li className="group font-medium text-[#1B2128] text-[1rem] px-2 rounded-lg py-3 flex items-center hover:bg-[#dce1f5] hover:text-[#2d5bff] hover:cursor-pointer">
          <Link to="/" className="flex items-center w-full">
            <LucideRows4 className="pr-1 group-hover:text-[#2d5bff] text-[#9dacbe]" />
            Agentes
          </Link>
        </li>
        <li className="group font-medium text-[#1B2128] text-[1rem] px-2 rounded-lg py-3 flex items-center hover:bg-[#dce1f5] hover:text-[#2d5bff] hover:cursor-pointer">
          <Link to="/list-customers" className="flex items-center w-full">
            <LucideRows4 className="pr-1 group-hover:text-[#2d5bff] text-[#9dacbe]" />
            Clientes
          </Link>
        </li>
        <li className="group font-medium text-[#1B2128] text-[1rem] px-2 rounded-lg py-3 flex items-center hover:bg-[#dce1f5] hover:text-[#2d5bff] hover:cursor-pointer">
          <Link to="/create-agent" className="flex items-center w-full">
            <UserRoundPlus className="pr-1 group-hover:text-[#2d5bff] text-[#9dacbe]" />
            Criar agente
          </Link>
        </li>
        <li className="group font-medium text-[#1B2128] text-[1rem] px-2 rounded-lg py-3 flex items-center hover:bg-[#dce1f5] hover:text-[#2d5bff] hover:cursor-pointer">
          <Link to="/create-customer" className="flex items-center w-full">
            <FilePlus className="pr-1 group-hover:text-[#2d5bff] text-[#9dacbe]" />
            Criar cliente
          </Link>
        </li>
        <li className="group font-medium text-[#1B2128] text-[1rem] px-2 rounded-lg py-3 flex items-center hover:bg-[#dce1f5] hover:text-[#2d5bff] hover:cursor-pointer">
          <Link to="/report" className="flex items-center w-full">
            <ScrollText className="pr-1 group-hover:text-[#2d5bff] text-[#9dacbe]" />
            Gerar Relatório
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
