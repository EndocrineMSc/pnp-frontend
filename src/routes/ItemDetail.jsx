import { useState, useEffect, useContext } from "react";
import { ApiContext } from "../Contexts";
import DetailView from "../components/DetailView";

const ItemDetailView = () => {
  const [itemData, setItemData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const apiContext = useContext(ApiContext);

  /*
  useEffect(() => {
    const fetchItem = async () => {
      let response = await fetch(
        `https://pnp-backend.fly.dev/api/v1/${apiContext.itemId}`,
      );
      // try again after possible token refresh
      if (response.status === 401) {
        const newAccessToken = await response.json();
        if (response.status === 200) {
          localStorage.setItem("accessToken", "Bearer " + newAccessToken);
          response = await fetch(
            `https://pnp-backend.fly.dev/api/v1/${apiContext.itemId}`,
          );
        }
      }

      if (response.status === 200) {
        const item = await response.json();
        setItemData(item);
        setIsLoading(false);
      }
    };
    fetchItem();
  }, [apiContext.itemId]);
  */

  //testing
  useEffect(() => {
    setItemData({
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
    return <DetailView type="object" viewData={itemData} />;
  }
};

export default ItemDetailView;
