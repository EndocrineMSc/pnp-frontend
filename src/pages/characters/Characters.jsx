import { useState, useEffect } from "react";
import EntryCardLayout from "../../components/entryCardLayout/EntryCardLayout";
import AddButton from "../../components/buttons/addButton/AddButton";
import GridSpinner from "../../components/gridSpinner/GridSpinner";
import { apiRequest } from "../../utility/apiRequests/apiRequest";
import useCampaignId from "../../utility/hooks/useCampaignId";

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
