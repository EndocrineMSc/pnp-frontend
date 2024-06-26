import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DetailView from "../detailView/DetailView";
import { apiRequest } from "../../../utility/apiRequests/apiRequest";

/**Displays detail data of a single object to the user- Allows for editing or deleting the entry. */
const ObjectDetailView = () => {
  const [objectData, setObjectData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const fetchObject = async () => {
      const result = await apiRequest(
        "GET",
        `https://pnp-backend.fly.dev/api/v1/object/${id}`,
      );

      if (result.success) {
        setObjectData(result.data);
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
