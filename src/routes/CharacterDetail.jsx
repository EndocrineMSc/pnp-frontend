import { useState, useEffect, useContext } from "react";
import { ApiContext } from "../Contexts";
import EditButton from "../components/basic-ui/EditButton";
import DeleteButton from "../components/basic-ui/DeleteButton";

const CharacterDetailView = () => {
  const [characterData, setCharacterData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const apiContext = useContext(ApiContext);

  /*
  useEffect(() => {
    const fetchCharacter = async () => {
      let response = await fetch(
        `https://pnp-backend.fly.dev/api/v1/characters/${apiContext.characterId}`,
      );
      // try again after possible token refresh
      if (response.status === 401) {
        const newAccessToken = await response.json();
        if (response.status === 200) {
          localStorage.setItem("accessToken", "Bearer " + newAccessToken);
          response = await fetch(
            `https://pnp-backend.fly.dev/api/v1/characters/${apiContext.characterId}`,
          );
        }
      }

      if (response.status === 200) {
        const campaign = await response.json();
        setCharacterData(campaign);
        setIsLoading(false);
      }
    };
    fetchCharacter();
  }, [apiContext.characterId]);
  */

  //testing
  useEffect(() => {
    setCharacterData({
      name: "Test character",
      short_description:
        "Upon a wednesday night, doves danced above the moonlight.",
      long_description:
        "Upon a wednesday night, doves danced above the moonlight. And swarmed the beaches of normandy, defeating many of soldier with white-greyish pp",
      location: "Udersbrechter Brücke",
      occupation: "Blacksmith",
    });
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <></>;
  } else {
    return (
      <div className="flex justify-center items-start w-full h-screen p-2">
        <div className="flex flex-col gap-3 p-4 bg-wgray-300 rounded-xl max-w-screen-sm">
          <div className="flex justify-start items-start gap-10">
            <img
              className="w-[150px] aspect-square bg-wgray-400 rounded-xl"
              src={
                characterData.image ? characterData.image : "./character.svg"
              }
              alt="character"
            />
            <div className="flex gap-10 text-xl">
              <div className="flex flex-col gap-7">
                <h3 className="font-semibold">Location: </h3>
                <h3 className="font-semibold">Occupation: </h3>
              </div>
              <div className="flex flex-col gap-7">
                <div>{characterData.location}</div>
                <div>{characterData.occupation}</div>
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <h2 className="text-3xl font-bold">{characterData.name}</h2>
            <div className="flex gap-2">
              <EditButton type="character" />
              <DeleteButton />
            </div>
          </div>
          <div className="flex flex-col w-full gap-2">
            <h3 className="font-semibold">Short Description</h3>
            <div className="bg-wgray-200 p-2 rounded">
              {characterData.short_description}
            </div>
            <h3 className="font-semibold">Long Description</h3>
            <div className="bg-wgray-200 p-2 rounded">
              {characterData.long_description}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default CharacterDetailView;
