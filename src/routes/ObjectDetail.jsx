import { useState, useEffect } from "react";
import DetailView from "../components/DetailView";
import { useParams } from "react-router-dom";
import { getRequest } from "../hooks/getRequest";

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
