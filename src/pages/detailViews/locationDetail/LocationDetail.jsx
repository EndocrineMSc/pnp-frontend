import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DetailView from "../detailView/DetailView";
import { apiRequest } from "../../../utility/apiRequests/apiRequest";

/**Displays detail data of a single location to the user- Allows for editing or deleting the entry. */
const LocationDetailView = () => {
  const [locationData, setLocationData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const fetchCampaign = async () => {
      const result = await apiRequest(
        "GET",
        `https://pnp-backend.fly.dev/api/v1/location/${id}`,
      );

      if (result.success) {
        setLocationData(result.data);
        setIsLoading(false);
      }
    };
    fetchCampaign();
  }, [id]);

  if (isLoading) {
    return <></>;
  } else {
    return <DetailView type="location" viewData={locationData} />;
  }
};

export default LocationDetailView;
