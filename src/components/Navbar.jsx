import NavLink from "./NavLink";
import CollapseButton from "./basic-ui/CollapseButton";
import Searchbar from "./basic-ui/Searchbar";
import { useState, useContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { NavbarContext } from "../Contexts";
import { apiRequest } from "../apiRequests/apiRequest";
import useCampaignId from "../hooks/useCampaignId";
import ConfirmationBox from "./modals/ConfirmationBox";
import logoutUser from "../utilityFunctions/logoutUser";

/**Navigation component for the different single-page app routes */
const Navbar = () => {
  const [activePage, setActivePage] = useState("Dashboard");
  const [imagePath, setImagePath] = useState("../campaign.svg");
  const [campaignName, setCampaignName] = useState("");
  const [showLogoutModal, toggleLogoutModal] = useReducer(
    (prev) => !prev,
    false,
  );
  const campaignId = useCampaignId()[0];
  const navigate = useNavigate();

  const clickHandler = (event) => {
    setActivePage(event.target.textContent);
  };

  const handleLogout = () => {
    logoutUser();
    navigate("/welcome");
  };

  useEffect(() => {
    const shortCampaignName = (name) => {
      const nameArr = name.split("");
      let modName = name;

      if (nameArr.length >= 20) {
        const truncArr = nameArr.slice(0, 17);
        truncArr.push("...");
        modName = truncArr.join("");
      }

      setCampaignName(modName);
    };

    const getImage = async () => {
      if (campaignId !== "") {
        const campaign = await apiRequest(
          "GET",
          `https://pnp-backend.fly.dev/api/v1/campaign/${campaignId}`,
        );

        const path = campaign.image;
        const name = campaign.name;

        shortCampaignName(name);
        if (path) {
          setImagePath(path);
        }
      }
    };
    getImage();
  }, [campaignId]);

  const providerValues = useContext(NavbarContext);

  return (
    <nav className="flex flex-col justify-start items-start gap-2 bg-wgray-200 h-screen list-none pl-2 max-w-60">
      <li>
        <div className="flex gap-3 pt-2 pe-2">
          <CollapseButton
            toggleCollapse={providerValues.toggleNavbar}
            isExpanded={providerValues.isExpanded}
            isPageRight={false}
          />
          <Searchbar />
        </div>
      </li>
      <li className="relative flex flex-col items-center w-full">
        <img
          className="mr-2 bg-wgray-400 rounded-xl w-card-image h-card-image"
          src={imagePath}
          alt=""
        />
        <div className="absolute text-center text-pretty text-wgray-50 font-bold text-xl mr-2 bottom-1">
          {campaignName}
        </div>
      </li>
      <NavLink
        path="/notes"
        text="Dashboard"
        onClick={clickHandler}
        className={activePage === "Dashboard" ? "bg-wgray-400" : ""}
      />
      <NavLink
        path="/campaigns"
        text="Campaigns"
        onClick={clickHandler}
        className={activePage === "Campaigns" ? "bg-wgray-400" : ""}
      />
      <NavLink
        path="/characters"
        text="Characters"
        onClick={clickHandler}
        className={activePage === "Characters" ? "bg-wgray-400" : ""}
      />
      <NavLink
        path="/locations"
        text="Locations"
        onClick={clickHandler}
        className={activePage === "Locations" ? "bg-wgray-400" : ""}
      />
      <NavLink
        path="/objects"
        text="Objects"
        onClick={clickHandler}
        className={activePage === "Objects" ? "bg-wgray-400" : ""}
      />
      <button
        className="w-full h-16 flex items-center pl-4 rounded-l-xl text-2xl leading-loose hover:bg-wgray-400 active:bg-wgray-400"
        onClick={toggleLogoutModal}
        type="button"
      >
        Log Out
      </button>
      {showLogoutModal ? (
        <ConfirmationBox
          text="Log Out?"
          onConfirm={handleLogout}
          onAbort={toggleLogoutModal}
        />
      ) : null}
    </nav>
  );
};

export default Navbar;
