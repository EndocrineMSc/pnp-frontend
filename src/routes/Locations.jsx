import EntryCardLayout from "../components/EntryCardLayout";
import { getRequest } from "../hooks/getRequest";
import { useState, useEffect } from "react";

const Locations = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [locations, setLocations] = useState(null);

  useEffect(() => {
    const campaignId = localStorage.getItem("campaignId");
    const fetchLocations = async () => {
      const result = await getRequest(
        `https://pnp-backend.fly.dev/api/v1/${campaignId}/locations`,
      );

      if (result) {
        setLocations(result);
        setIsLoading(false);
      }
    };
    fetchLocations();
  }, []);

  if (isLoading) {
    return <></>;
  }

  return (
    <EntryCardLayout cards={locations} type="location" title="Locations" />
  );
};

export default Locations;
