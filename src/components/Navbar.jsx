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
import Icon from "@mdi/react";
import useDefaultImage from "../hooks/useDefaultImage";

/**Navigation component for the different single-page app routes */
const Navbar = () => {
  const [imagePath, setImagePath] = useState(null);
  const [campaignName, setCampaignName] = useState("");
  const [showLogoutModal, toggleLogoutModal] = useReducer(
    (prev) => !prev,
    false,
  );
  const campaignId = useCampaignId()[0];
  const navigate = useNavigate();
  const defaultImage = useDefaultImage("campaign");

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

        const path = campaign.data.image;
        const name = campaign.data.name;

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
        {imagePath ? (
          <img
            className="mr-2 bg-wgray-400 rounded-xl w-card-image h-card-image"
            src={imagePath}
            alt="campaign"
          />
        ) : (
          <Icon
            className="mr-2 bg-wgray-400 rounded-xl w-card-image h-card-image"
            path={defaultImage}
            alt="campaign"
          />
        )}
        <div className="absolute text-center text-pretty text-wgray-50 font-bold text-xl mr-2 bottom-1">
          {campaignName}
        </div>
      </li>
      <NavLink path="/notes" text="Dashboard" />
      <NavLink path="/campaigns" text="Campaigns" />
      <NavLink path="/characters" text="Characters" />
      <NavLink path="/locations" text="Locations" />
      <NavLink path="/objects" text="Objects" />
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
