import { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const [sidebarState, setSidebarState] = useState(false);

  const toggleSidebar = () => {
    setSidebarState(!sidebarState);
  };

  return (
    <div className="flex flex-nowrap flex-col min-h-[100vh] min-w-full bg-athensgray-50">
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="flex flex-nowrap md:flex-row gap-1">
        <Sidebar isOpen={sidebarState} />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
