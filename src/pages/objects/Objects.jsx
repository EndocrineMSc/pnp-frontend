import { useState, useEffect } from "react";
import EntryCardLayout from "../../components/entryCardLayout/EntryCardLayout";
import AddButton from "../../components/buttons/addButton/AddButton";
import GridSpinner from "../../components/gridSpinner/GridSpinner";
import { apiRequest } from "../../utility/apiRequests/apiRequest";
import useCampaignId from "../../utility/hooks/useCampaignId";

/**Overview page for objects. */
const Objects = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [objects, setObjects] = useState([]);
  const campaignId = useCampaignId()[0];
  const minSpinnerTimeMS = 500;

  useEffect(() => {
    const fetchObjects = async () => {
      if (campaignId !== "") {
        setIsLoading(true);
        const startTime = Date.now();
        const result = await apiRequest(
          "GET",
          `https://pnp-backend.fly.dev/api/v1/${campaignId}/objects`,
        );
        const elapsedTime = Date.now() - startTime;

        if (result.success) {
          setObjects(result.data);
          setTimeout(() => setIsLoading(false), minSpinnerTimeMS - elapsedTime);
        }
      }
    };
    fetchObjects();
  }, [campaignId]);

  const onObjectAdded = (object) => {
    setObjects([...objects, object]);
  };

  return (
    <>
      {isLoading ? (
        <GridSpinner />
      ) : (
        <EntryCardLayout cards={objects} type="object" title="Objects" />
      )}
      <AddButton type="object" updateParent={onObjectAdded} />
    </>
  );
};

export default Objects;
