import { useState, useEffect } from "react";
import EntryCardLayout from "../../components/entryCardLayout/EntryCardLayout";
import AddButton from "../../components/buttons/addButton/AddButton";
import GridSpinner from "../../components/gridSpinner/GridSpinner";
import { apiRequest } from "../../utility/apiRequests/apiRequest";
import useUserId from "../../utility/hooks/useUserId";

/**Overview page for campaigns. */
const Campaigns = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const userId = useUserId()[0];
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

      if (result.success) {
        setCampaigns(result.data);
        setTimeout(() => setIsLoading(false), minSpinnerTimeMS - elapsedTime);
      }
    };
    if (userId) fetchCampaigns();
  }, [userId]);

  const addNewCampaign = (campaign) => {
    setCampaigns([...campaigns, campaign]);
  };

  return (
    <div className="relative h-full w-full">
      {isLoading ? (
        <GridSpinner />
      ) : (
        <EntryCardLayout cards={campaigns} type="campaign" title="Campaigns" />
      )}
      <AddButton type="campaign" updateParent={addNewCampaign} />
    </div>
  );
};

export default Campaigns;
