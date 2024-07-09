import Sidebar from "../Sidebar";
import Header from "../Header";
import { Outlet } from "react-router-dom";
import { useState } from "react";

const Layout: React.FC = () => {
  const [openSidebar, setOpenSidebar] = useState<boolean>(true);
  return (
    <div className="fixed flex flex-col w-full h-full">
      <Header openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
      <div className="flex flex-1 w-full overflow-x-hidden overflow-y-auto">
        <Sidebar openSidebar={openSidebar} />
        <div className="flex flex-1 w-full bg-[#f9f9f9] overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
