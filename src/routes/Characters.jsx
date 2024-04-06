import EntryCardLayout from "../components/EntryCardLayout";
import AddButton from "../components/basic-ui/AddButton";
import { getRequest } from "../apiRequests/getRequest";
import { useState, useEffect } from "react";
import useCampaignId from "../hooks/useCampaignId";

/**Overview page for characters. */
const Characters = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [characters, setCharacters] = useState(null);
  const campaignId = useCampaignId();

  useEffect(() => {
    console.log("characters useEffect triggered");
    console.log("characters has campaignId: " + campaignId);
    const fetchCharacters = async () => {
      console.log("triggered fetch characters with campaignId : " + campaignId);
      if (campaignId !== "") {
        const result = await getRequest(
          `https://pnp-backend.fly.dev/api/v1/${campaignId}/characters`,
        );

        console.log(result);
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
    console.log("characters loading!");
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
