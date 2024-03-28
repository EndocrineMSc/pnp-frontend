import { useState, useEffect } from "react";
import EditButton from "../components/basic-ui/EditButton";
import DeleteButton from "../components/basic-ui/DeleteButton";
import { getRequest } from "../hooks/getRequest";
import { useParams } from "react-router-dom";

const CampaignDetailView = () => {
  const [campaignData, setCampaignData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const fetchCampaign = async () => {
      const campaign = await getRequest(
        `https://pnp-backend.fly.dev/api/v1/campaign/${id}`,
      );

      if (campaign) {
        setCampaignData(campaign);
        setIsLoading(false);
        localStorage.setItem("campaignId", id);
      }
    };
    fetchCampaign();
  }, [id]);

  if (isLoading) {
    return <></>;
  } else {
    return (
      <div className="flex justify-center items-start w-full h-screen p-2">
        <div className="flex flex-col gap-3 p-4 bg-wgray-300 rounded-xl max-w-screen-sm">
          <div className="flex justify-center align-center w-full">
            <img
              className="w-[150px] aspect-square bg-wgray-400 rounded-xl"
              src={campaignData.image ? campaignData.image : "/campaign.svg"}
              alt="campaign"
            />
          </div>
          <div className="flex justify-between">
            <h2 className="text-3xl font-bold">{campaignData.name}</h2>
            <div className="flex gap-2">
              <EditButton type="campaign" data={campaignData} />
              <DeleteButton />
            </div>
          </div>
          <div className="bg-wgray-200 p-2 rounded">
            {campaignData.description}
          </div>
        </div>
      </div>
    );
  }
};

export default CampaignDetailView;
