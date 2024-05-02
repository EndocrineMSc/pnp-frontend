import EntryCardLayout from "../components/EntryCardLayout";
import { apiRequest } from "../apiRequests/apiRequest";
import { useState, useEffect } from "react";
import AddButton from "../components/basic-ui/AddButton";
import GridSpinner from "../components/basic-ui/GridSpinner";

/**Overview page for campaigns. */
const Campaigns = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const userId = localStorage.getItem("userId");
  const minSpinnerTimeMS = 500;

  useEffect(() => {
    const fetchCampaigns = async () => {
      setIsLoading(true);
      const startTime = Date.now();
      const result = await apiRequest(
        "GET",
        `https://pnp-backend.fly.dev/api/v1/${userId}/campaigns`,
      );
      const elapsedTime = Date.now() - startTime;

      if (!result.message) {
        setCampaigns(result);
        setTimeout(() => setIsLoading(false), minSpinnerTimeMS - elapsedTime);
      }
    };
    fetchCampaigns();
  }, [userId]);

  const addNewCampaign = (campaign) => {
    setCampaigns([...campaigns, campaign]);
  };

  return (
    <>
      {isLoading ? (
        <GridSpinner />
      ) : (
        <EntryCardLayout cards={campaigns} type="campaign" title="Campaigns" />
      )}
      <AddButton type="campaign" updateParent={addNewCampaign} />
    </>
  );
};

export default Campaigns;
