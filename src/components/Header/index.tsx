import { Menu } from "lucide-react";
import { Link } from "react-router-dom";

interface HeaderProps {
  openSidebar: boolean;
  setOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}
const Header: React.FC<HeaderProps> = ({
  openSidebar,
  setOpenSidebar,
}: HeaderProps) => {
  return (
    <div className="bg-white h-[3.40rem] border-b-2 flex items-center justify-start py-2 px-5 w-full space-x-4">
      <Menu
        color="#c3c3c5"
        className="cursor-pointer"
        onClick={() => setOpenSidebar(!openSidebar)}
      />
      <Link to="/" className="font-bold text-[#2d5bff] text-lg cursor-pointer">
        CRM Vendas
      </Link>
    </div>
  );
};

export default Header;
