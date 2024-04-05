import { ApiContext } from "../Contexts";
import EntryCardLayout from "../components/EntryCardLayout";
import { getRequest } from "../apiRequests/getRequest";
import { useState, useEffect, useContext } from "react";
import AddButton from "../components/basic-ui/AddButton";

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
