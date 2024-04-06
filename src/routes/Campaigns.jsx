import EntryCardLayout from "../components/EntryCardLayout";
import { getRequest } from "../apiRequests/getRequest";
import { useState, useEffect } from "react";
import AddButton from "../components/basic-ui/AddButton";

/**Overview page for campaigns. */
const Campaigns = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [campaigns, setCampaigns] = useState(null);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchCampaigns = async () => {
      const result = await getRequest(
        `https://pnp-backend.fly.dev/api/v1/${userId}/campaigns`,
      );

      if (result) {
        setCampaigns(result);
        setIsLoading(false);
      }
    };
    fetchCampaigns();
  }, [userId]);

  const addNewCampaign = (campaign) => {
    setCampaigns([...campaigns, campaign]);
  };

  if (isLoading) {
    return <></>;
  }

  return (
    <>
      <EntryCardLayout cards={campaigns} type="campaign" title="Campaigns" />
      <AddButton type="campaign" updateParent={addNewCampaign} />
    </>
  );
};

export default Campaigns;
