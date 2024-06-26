import { Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import CollapsedNavbar from "../../components/collapsedNavbar/CollapsedNavbar";
import { NavbarContext } from "../../utility/contexts";
import PropTypes from "prop-types";
import useCampaignId from "../../utility/hooks/useCampaignId";
import useUserId from "../../utility/hooks/useUserId";

/**Main page of the webapp, displays a navbar and the currently selected page view (Outlet) */
const Dashboard = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const userId = useUserId()[0];
  const campaignId = useCampaignId()[0];
  const navigate = useNavigate();
  const currentPath = window.location.pathname;

  const toggleNavbar = () => {
    setShowNavbar((prev) => !prev);
  };
  const providerValues = { isExpanded: showNavbar, toggleNavbar };

  useEffect(() => {
    if (currentPath === "/" && userId === "") {
      navigate("/welcome");
    } else if (userId && campaignId !== "" && currentPath === "/") {
      navigate("/notes");
    } else if (userId && currentPath === "/") {
      navigate("/campaigns");
    }
  }, [userId, currentPath, navigate, campaignId]);

  return (
    <div className="flex justify-start items-start w-full h-screen text-wgray-950 bg-wgray-50">
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
