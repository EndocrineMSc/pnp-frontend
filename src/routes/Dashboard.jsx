import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

const Dashboard = () => {
  return (
    <div className="flex justify-start items-start w-screen h-screen text-wgray-950">
      <NavBar />
      <Outlet />
    </div>
  );
};

export default Dashboard;
