import { Outlet } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";
import CollapsedNavbar from "../components/CollapsedNavbar";
import { NavbarContext } from "../Contexts";

const Dashboard = () => {
  const [showNavbar, setShowNavbar] = useState(true);

  const toggleNavbar = () => {
    setShowNavbar((prev) => !prev);
  };

  const providerValues = { isExpanded: showNavbar, toggleNavbar };

  return (
    <div className="flex justify-start items-start w-full h-full text-wgray-950 bg-wgray-50 dark:bg-wgray-950">
      <NavbarContext.Provider value={providerValues}>
        {showNavbar ? <Navbar /> : <CollapsedNavbar />}
      </NavbarContext.Provider>
      <Outlet />
    </div>
  );
};

export default Dashboard;
