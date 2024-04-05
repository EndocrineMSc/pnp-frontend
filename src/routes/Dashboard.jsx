import { Outlet } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import Navbar from "../components/Navbar";
import CollapsedNavbar from "../components/CollapsedNavbar";
import { ApiContext, NavbarContext } from "../Contexts";
import { Navigate } from "react-router-dom";
import { getRequest } from "../apiRequests/getRequest";

const Dashboard = ({ isLoggedIn }) => {
  const [showNavbar, setShowNavbar] = useState(true);
  const apiContext = useContext(ApiContext);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const setDefaultCampaignId = async () => {
      const campaigns = await getRequest(
        `https://pnp-backend.fly.dev/api/v1/${userId}/campaigns`,
      );

      if (campaigns) {
        const defaultId = campaigns[0]._id;
        apiContext.setCampaignId(defaultId);
      }
    };

    if (isLoggedIn && apiContext.campaignId === "") {
      setDefaultCampaignId();
    }
  }, [apiContext, isLoggedIn, userId]);

  const toggleNavbar = () => {
    setShowNavbar((prev) => !prev);
  };

  const providerValues = { isExpanded: showNavbar, toggleNavbar };
  const currentPath = window.location.pathname;

  if (currentPath === "/") {
    return <Navigate replace to="/welcome" />;
  } else {
    return (
      <div className="flex justify-start items-start w-full h-full text-wgray-950 bg-wgray-50 dark:bg-wgray-950">
        <NavbarContext.Provider value={providerValues}>
          {showNavbar ? <Navbar /> : <CollapsedNavbar />}
        </NavbarContext.Provider>
        <Outlet />
      </div>
    );
  }
};

export default Dashboard;
