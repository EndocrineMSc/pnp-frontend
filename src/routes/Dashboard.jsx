import { Outlet } from "react-router-dom";
import { useState } from "react";
import NavBar from "../components/NavBar";
import CollapsedNavBar from "../components/CollapsedNavBar";

const Dashboard = () => {
  const [showNavBar, setShowNavBar] = useState(true);

  const toggleNavBar = () => {
    console.log("Click");
    setShowNavBar(prev => !prev);
  }

  return (
    <div className="flex justify-start items-start w-full h-full text-wgray-950 bg-wgray-50 dark:bg-wgray-950">
      {showNavBar ? <NavBar hideNavBar={toggleNavBar}/> : <CollapsedNavBar showNavBar={toggleNavBar}/>}
      <Outlet />
    </div>
  );
};

export default Dashboard;
