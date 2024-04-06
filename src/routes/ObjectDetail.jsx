import { useState, useEffect } from "react";
import DetailView from "../components/DetailView";
import { useParams } from "react-router-dom";
import { getRequest } from "../apiRequests/getRequest";

/**Displays detail data of a single object to the user- Allows for editing or deleting the entry. */
const ObjectDetailView = () => {
  const [objectData, setObjectData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const fetchObject = async () => {
      const object = await getRequest(
        `https://pnp-backend.fly.dev/api/v1/object/${id}`,
      );

      if (object) {
        setObjectData(object);
        setIsLoading(false);
      }
    };
    fetchObject();
  }, [id]);

  if (isLoading) {
    return <></>;
  } else {
    return <DetailView type="object" viewData={objectData} />;
  }
};

export default ObjectDetailView;
