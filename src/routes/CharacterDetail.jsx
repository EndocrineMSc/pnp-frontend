import { useState, useEffect } from "react";
import EditButton from "../components/basic-ui/EditButton";
import DeleteButton from "../components/basic-ui/DeleteButton";
import { useParams, useNavigate } from "react-router-dom";
import { apiRequest } from "../apiRequests/apiRequest";
import unescapeText from "../utilityFunctions/unescapeText";

/**Displays detail data of a single character to the user- Allows for editing or deleting the entry. */
const CharacterDetailView = () => {
  const [characterData, setCharacterData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCharacter = async () => {
      const character = await apiRequest(
        "GET",
        `https://pnp-backend.fly.dev/api/v1/character/${id}`,
      );

      if (character) {
        setCharacterData(character);
        setIsLoading(false);
      }
    };
    fetchCharacter();
  }, [id]);

  const deleteCharacter = async () => {
    const result = await apiRequest(
      "POST",
      `https://pnp-backend.fly.dev/api/v1/character/${id}/delete`,
    );

    if (result) {
      navigate("/characters");
    }
  };

  if (isLoading) {
    return <></>;
  } else {
    return (
      <div className="flex justify-center items-start w-full h-screen p-2">
        <div className="flex flex-col gap-3 p-4 bg-wgray-300 rounded-xl max-w-screen-sm">
          <div className="flex justify-start items-start gap-10">
            <img
              className="w-card-image aspect-square bg-wgray-400 rounded-xl"
              src={characterData.image ? characterData.image : "/character.svg"}
              alt="character"
            />
            <div className="flex gap-5 text-xl">
              <div className="flex flex-col gap-7">
                <h3 className="font-semibold">Location: </h3>
                <h3 className="font-semibold">Occupation: </h3>
              </div>
              <div className="flex flex-col gap-7">
                <div>
                  {characterData.location ? characterData.location : "n.a."}
                </div>
                <div>{characterData.occupation}</div>
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <h2 className="text-3xl font-bold">
              {unescapeText(characterData.name)}
            </h2>
            <div className="flex gap-2">
              <EditButton
                type="character"
                data={characterData}
                updateParent={setCharacterData}
              />
              <DeleteButton
                text="Delete Character?"
                deleteEntry={deleteCharacter}
              />
            </div>
          </div>
          <div className="flex flex-col w-full gap-2">
            <h3 className="font-semibold">Short Description</h3>
            <div className="bg-wgray-200 p-2 rounded">
              {unescapeText(characterData.short_description)}
            </div>
            <h3 className="font-semibold">Long Description</h3>
            <div className="bg-wgray-200 p-2 rounded">
              {unescapeText(characterData.long_description)}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default CharacterDetailView;
