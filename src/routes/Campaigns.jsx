import EntryCardLayout from "../components/EntryCardLayout";
import { getRequest } from "../hooks/getRequest";
import { useState, useEffect, useContext } from "react";
import { ApiContext } from "../Contexts";

const Campaigns = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [campaigns, setCampaigns] = useState(null);
  const userId = useContext(ApiContext).userId;

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

  if (isLoading) {
    return <></>;
  }

  return (
    <EntryCardLayout cards={campaigns} type="campaign" title="Campaigns" />
  );
};

export default Campaigns;
