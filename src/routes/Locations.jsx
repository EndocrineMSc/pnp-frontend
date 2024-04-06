import EntryCardLayout from "../components/EntryCardLayout";
import { getRequest } from "../apiRequests/getRequest";
import { useState, useEffect } from "react";
import AddButton from "../components/basic-ui/AddButton";
import useCampaignId from "../hooks/useCampaignId";

/**Overview page for locations. */
const Locations = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [locations, setLocations] = useState(null);
  const campaignId = useCampaignId();

  useEffect(() => {
    const fetchLocations = async () => {
      if (campaignId !== "") {
        const result = await getRequest(
          `https://pnp-backend.fly.dev/api/v1/${campaignId}/locations`,
        );

        if (result) {
          setLocations(result);
          setIsLoading(false);
        }
      }
    };
    fetchLocations();
  }, [campaignId]);

  const onLocationAdded = (location) => {
    setLocations([...locations, location]);
  };

  if (isLoading) {
    return <></>;
  }

  return (
    <div>
      <EntryCardLayout cards={locations} type="location" title="Locations" />
      <AddButton type="location" updateParent={onLocationAdded} />
    </div>
  );
};

export default Locations;
