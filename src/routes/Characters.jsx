import EntryCardLayout from "../components/EntryCardLayout";
import { getRequest } from "../hooks/getRequest";
import { useState, useEffect } from "react";

const Characters = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [characters, setCharacters] = useState(null);

  useEffect(() => {
    const campaignId = localStorage.getItem("campaignId");
    const fetchCharacters = async () => {
      const result = await getRequest(
        `https://pnp-backend.fly.dev/api/v1/${campaignId}/characters`,
      );

      if (result) {
        setCharacters(result);
        setIsLoading(false);
      }
    };
    fetchCharacters();
  }, []);

  if (isLoading) {
    return <></>;
  }

  return (
    <EntryCardLayout cards={characters} type="character" title="Characters" />
  );
};

export default Characters;
