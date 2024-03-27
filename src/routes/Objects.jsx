import EntryCardLayout from "../components/EntryCardLayout";
import { getRequest } from "../hooks/getRequest";
import { useState, useEffect } from "react";

const Objects = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [objects, setObjects] = useState(null);

  useEffect(() => {
    const campaignId = localStorage.getItem("campaignId");
    const fetchObjects = async () => {
      const result = await getRequest(
        `https://pnp-backend.fly.dev/api/v1/${campaignId}/objects`,
      );

      if (result) {
        setObjects(result);
        setIsLoading(false);
      }
    };
    fetchObjects();
  }, []);

  if (isLoading) {
    return <></>;
  }

  return <EntryCardLayout cards={objects} type="object" title="Objects" />;
};

export default Objects;
