import { ApiContext } from "../Contexts";
import EntryCardLayout from "../components/EntryCardLayout";
import { getRequest } from "../hooks/getRequest";
import { useState, useEffect, useContext } from "react";

const Locations = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [locations, setLocations] = useState(null);
  const apiContext = useContext(ApiContext);

  useEffect(() => {
    const fetchLocations = async () => {
      const result = await getRequest(
        `https://pnp-backend.fly.dev/api/v1/${apiContext.campaignId}/locations`,
      );

      if (result) {
        setLocations(result);
        setIsLoading(false);
      }
    };
    fetchLocations();
  }, [apiContext.campaignId]);

  if (isLoading) {
    return <></>;
  }

  return (
    <EntryCardLayout cards={locations} type="location" title="Locations" />
  );
};

export default Locations;
