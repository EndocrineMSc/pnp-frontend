import { useState, useEffect, useContext } from "react";
import { ApiContext } from "../Contexts";
import DetailView from "../components/DetailView";

const LocationDetailView = () => {
  const [locationData, setLocationData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const apiContext = useContext(ApiContext);

  /*
  useEffect(() => {
    const fetchCharacter = async () => {
      let response = await fetch(
        `https://pnp-packend.fly.dev/api/v1/${apiContext.locationId}`,
      );
      // try again after possible token refresh
      if (response.status === 401) {
        const newAccessToken = await response.json();
        if (response.status === 200) {
          localStorage.setItem("accessToken", "Bearer " + newAccessToken);
          response = await fetch(
            `https://pnp-packend.fly.dev/api/v1/${apiContext.locationId}`,
          );
        }
      }

      if (response.status === 200) {
        const location = await response.json();
        setLocationData(location);
        setIsLoading(false);
      }
    };
    fetchCharacter();
  }, [apiContext.locationId]);
  */

  //testing
  useEffect(() => {
    setLocationData({
      name: "Test location",
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
    return <DetailView type="location" viewData={locationData} />;
  }
};

export default LocationDetailView;
