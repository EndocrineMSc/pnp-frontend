import { useState, useEffect } from "react";
import EntryCardLayout from "../../components/entryCardLayout/EntryCardLayout";
import AddButton from "../../components/buttons/addButton/AddButton";
import GridSpinner from "../../components/gridSpinner/GridSpinner";
import { apiRequest } from "../../utility/apiRequests/apiRequest";
import useCampaignId from "../../utility/hooks/useCampaignId";

/**Overview page for locations. */
const Locations = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [locations, setLocations] = useState([]);
  const campaignId = useCampaignId()[0];
  const minSpinnerTimeMS = 500;

  useEffect(() => {
    const fetchLocations = async () => {
      if (campaignId !== "") {
        setIsLoading(true);
        const startTime = Date.now();
        const result = await apiRequest(
          "GET",
          `https://pnp-backend.fly.dev/api/v1/${campaignId}/locations`,
        );
        const elapsedTime = Date.now() - startTime;

        if (result.success) {
          setLocations(result.data);
          setTimeout(() => setIsLoading(false), minSpinnerTimeMS - elapsedTime);
        }
      }
    };
    fetchLocations();
  }, [campaignId]);

  const onLocationAdded = (location) => {
    setLocations([...locations, location]);
  };

  return (
    <>
      {isLoading ? (
        <GridSpinner />
      ) : (
        <EntryCardLayout cards={locations} type="location" title="Locations" />
      )}
      <AddButton type="location" updateParent={onLocationAdded} />
    </>
  );
};

export default Locations;
