import { ApiContext } from "../Contexts";
import EntryCardLayout from "../components/EntryCardLayout";
import AddButton from "../components/basic-ui/AddButton";
import { getRequest } from "../apiRequests/getRequest";
import { useState, useEffect, useContext } from "react";

const Characters = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [characters, setCharacters] = useState(null);
  const apiContext = useContext(ApiContext);

  useEffect(() => {
    const fetchCharacters = async () => {
      const result = await getRequest(
        `https://pnp-backend.fly.dev/api/v1/${apiContext.campaignId}/characters`,
      );

      if (result) {
        setCharacters(result);
        setIsLoading(false);
      }
    };
    fetchCharacters();
  }, [apiContext.campaignId]);

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
