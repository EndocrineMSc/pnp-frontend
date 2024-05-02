import EntryCardLayout from "../components/EntryCardLayout";
import AddButton from "../components/basic-ui/AddButton";
import { apiRequest } from "../apiRequests/apiRequest";
import { useState, useEffect } from "react";
import useCampaignId from "../hooks/useCampaignId";

/**Overview page for characters. */
const Characters = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [characters, setCharacters] = useState(null);
  const campaignId = useCampaignId()[0];

  useEffect(() => {
    const fetchCharacters = async () => {
      if (campaignId !== "") {
        const result = await apiRequest(
          "GET",
          `https://pnp-backend.fly.dev/api/v1/${campaignId}/characters`,
        );

        if (result) {
          setCharacters(result);
          setIsLoading(false);
        }
      }
    };
    fetchCharacters();
  }, [campaignId]);

  const onCharacterAdded = (character) => {
    setCharacters([...characters, character]);
  };

  if (isLoading) {
    return <></>;
  }

  return (
    <div>
      <EntryCardLayout cards={characters} type="character" title="Characters" />
      <AddButton type="character" updateParent={onCharacterAdded} />
    </div>
  );
};

export default Characters;
