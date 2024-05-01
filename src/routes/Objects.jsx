import EntryCardLayout from "../components/EntryCardLayout";
import { apiRequest } from "../apiRequests/apiRequest";
import { useState, useEffect } from "react";
import AddButton from "../components/basic-ui/AddButton";
import useCampaignId from "../hooks/useCampaignId";

/**Overview page for objects. */
const Objects = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [objects, setObjects] = useState(null);
  const campaignId = useCampaignId();

  useEffect(() => {
    const fetchObjects = async () => {
      if (campaignId !== "") {
        const result = await apiRequest(
          "GET",
          `https://pnp-backend.fly.dev/api/v1/${campaignId}/objects`,
        );

        if (result) {
          setObjects(result);
          setIsLoading(false);
        }
      }
    };
    fetchObjects();
  }, [campaignId]);

  const onObjectAdded = (object) => {
    setObjects([...objects, object]);
  };

  if (isLoading) {
    return <></>;
  }

  return (
    <div>
      <EntryCardLayout cards={objects} type="object" title="Objects" />
      <AddButton type="object" updateParent={onObjectAdded} />
    </div>
  );
};

export default Objects;
