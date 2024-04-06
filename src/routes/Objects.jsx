import { ApiContext } from "../Contexts";
import EntryCardLayout from "../components/EntryCardLayout";
import { getRequest } from "../apiRequests/getRequest";
import { useState, useEffect, useContext } from "react";
import AddButton from "../components/basic-ui/AddButton";

/**Overview page for objects. */
const Objects = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [objects, setObjects] = useState(null);
  const apiContext = useContext(ApiContext);

  useEffect(() => {
    const fetchObjects = async () => {
      const result = await getRequest(
        `https://pnp-backend.fly.dev/api/v1/${apiContext.campaignId}/objects`,
      );

      if (result) {
        setObjects(result);
        setIsLoading(false);
      }
    };
    fetchObjects();
  }, [apiContext.campaignId]);

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
