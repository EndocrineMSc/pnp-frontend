import { useState, useContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import NavLink from "../navlink/NavLink";
import CollapseButton from "../buttons/collapseButton/CollapseButton";
import ConfirmationBox from "../modals/confirmationBox/ConfirmationBox";
import { NavbarContext } from "../../utility/contexts";
import { apiRequest } from "../../utility/apiRequests/apiRequest";
import useCampaignId from "../../utility/hooks/useCampaignId";
import useUserId from "../../utility/hooks/useUserId";
import logoutUser from "../../utility/otherFunctions/logoutUser";
import useDefaultImage from "../../utility/hooks/useDefaultImage";
import Icon from "@mdi/react";

/**Navigation component for the different single-page app routes */
const Navbar = () => {
  const [imagePath, setImagePath] = useState(null);
  const [campaignName, setCampaignName] = useState("");
  const [showLogoutModal, toggleLogoutModal] = useReducer(
    (prev) => !prev,
    false,
  );
  const [campaignId, saveCampaignId] = useCampaignId();
  const navigate = useNavigate();
  const defaultImage = useDefaultImage("campaign");
  const saveUserId = useUserId()[1];

  const handleLogout = () => {
    logoutUser();
    saveUserId("");
    saveCampaignId("");
    setImagePath(null);
    setCampaignName("");
    navigate("/welcome");
  };

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

  useEffect(() => {
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

    window.addEventListener("onCampaignIdSet", getImage);
    getImage();

    return () => window.removeEventListener("onCampaignIdSet", getImage);
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
