import EntryCardLayout from "../components/EntryCardLayout";
import { getRequest } from "../hooks/getRequest";
import { useState, useEffect, useContext } from "react";
import { ApiContext } from "../Contexts";
import AddButton from "../components/basic-ui/AddButton";

const Campaigns = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [campaigns, setCampaigns] = useState(null);
  const apiContext = useContext(ApiContext);

  useEffect(() => {
    const fetchCampaigns = async () => {
      const result = await getRequest(
        `https://pnp-backend.fly.dev/api/v1/${apiContext.userId}/campaigns`,
      );

      if (result) {
        setCampaigns(result);
        setIsLoading(false);
      }
    };
    fetchCampaigns();
  }, [apiContext.userId]);

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
