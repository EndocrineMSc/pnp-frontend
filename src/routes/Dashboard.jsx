import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

const Dashboard = () => {
  return (
    <div className="flex justify-start items-start w-full h-full text-wgray-950 bg-wgray-50 dark:bg-wgray-950">
      <NavBar />
      <Outlet />
    </div>
  );
};

export default Dashboard;
