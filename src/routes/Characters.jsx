import EntryCardLayout from "../components/EntryCardLayout";
import AddButton from "../components/basic-ui/AddButton";
import { apiRequest } from "../apiRequests/apiRequest";
import { useState, useEffect } from "react";
import useCampaignId from "../hooks/useCampaignId";
import GridSpinner from "../components/basic-ui/GridSpinner";

/**Overview page for characters. */
const Characters = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [characters, setCharacters] = useState([]);
  const campaignId = useCampaignId()[0];
  const minSpinnerTimeMS = 500;

  useEffect(() => {
    const fetchCharacters = async () => {
      if (campaignId !== "") {
        setIsLoading(true);
        const startTime = Date.now();
        const result = await apiRequest(
          "GET",
          `https://pnp-backend.fly.dev/api/v1/${campaignId}/characters`,
        );
        const elapsedTime = Date.now() - startTime;

        if (result.success) {
          setCharacters(result.data);
          setTimeout(() => setIsLoading(false), minSpinnerTimeMS - elapsedTime);
        }
      }
    };
    fetchCharacters();
  }, [campaignId]);

  const onCharacterAdded = (character) => {
    setCharacters([...characters, character]);
  };

  return (
    <>
      {isLoading ? (
        <GridSpinner />
      ) : (
        <EntryCardLayout
          cards={characters}
          type="character"
          title="Characters"
        />
      )}

      <AddButton type="character" updateParent={onCharacterAdded} />
    </>
  );
};

export default Characters;
