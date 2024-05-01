import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import CollapsedNavbar from "../components/CollapsedNavbar";
import { NavbarContext } from "../Contexts";
import { useNavigate } from "react-router-dom";
import { getRequest } from "../apiRequests/getRequest";
import PropTypes from "prop-types";
import useCampaignId from "../hooks/useCampaignId";
import storeCampaignId from "../utilityFunctions/storeCampaignId";

/**Main page of the webapp, displays a navbar and the currently selected page view (Outlet) */
const Dashboard = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const userId = localStorage.getItem("userId");
  const campaignId = useCampaignId();
  const navigate = useNavigate();

  const setDefaultCampaignId = async () => {
    if (userId && !campaignId) {
      const campaigns = await getRequest(
        `https://pnp-backend.fly.dev/api/v1/${userId}/campaigns`,
      );

      if (campaigns) {
        const defaultId = campaigns[0]._id;
        storeCampaignId(defaultId);
      }
      navigate("/notes");
    }
  };

  window.addEventListener("load", setDefaultCampaignId);
  useEffect(() => {
    return () => {
      window.removeEventListener("load", setDefaultCampaignId);
    };
  });

  const toggleNavbar = () => {
    setShowNavbar((prev) => !prev);
  };

  const providerValues = { isExpanded: showNavbar, toggleNavbar };
  const currentPath = window.location.pathname;

  useEffect(() => {
    if (userId === "") {
      navigate("/welcome");
    } else if (currentPath === "/") {
      navigate("/notes");
    }
  }, [userId, currentPath, navigate]);

  return (
    <div className="flex justify-start items-start w-full h-full text-wgray-950 bg-wgray-50">
      <NavbarContext.Provider value={providerValues}>
        {showNavbar ? <Navbar /> : <CollapsedNavbar />}
      </NavbarContext.Provider>
      <Outlet />
    </div>
  );
};

Dashboard.propTypes = {
  isLoggedIn: PropTypes.bool,
};

export default Dashboard;
