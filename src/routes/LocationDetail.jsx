import { useState, useEffect } from "react";
import DetailView from "../components/DetailView";
import { getRequest } from "../hooks/getRequest";
import { postRequest } from "../hooks/postRequest";
import { useParams, useNavigate } from "react-router-dom";

const LocationDetailView = () => {
  const [locationData, setLocationData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const fetchCampaign = async () => {
      const location = await getRequest(
        `https://pnp-backend.fly.dev/api/v1/location/${id}`,
      );

      if (location) {
        setLocationData(location);
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
