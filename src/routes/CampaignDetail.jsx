import { useState, useEffect, useContext } from "react";
import EditButton from "../components/basic-ui/EditButton";
import DeleteButton from "../components/basic-ui/DeleteButton";
import { getRequest } from "../apiRequests/getRequest";
import { useParams } from "react-router-dom";
import { ApiContext } from "../Contexts";
import { postRequest } from "../apiRequests/postRequest";
import { useNavigate } from "react-router-dom";
import storeCampaignId from "../utilityFunctions/storeCampaignId";

/**Displays detail data of a single campaign to the user- Allows for editing or deleting the entry. */
const CampaignDetailView = () => {
  const [campaignData, setCampaignData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const apiContext = useContext(ApiContext);
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const fetchCampaign = async () => {
      const campaign = await getRequest(
        `https://pnp-backend.fly.dev/api/v1/campaign/${id}`,
      );

      if (campaign) {
        setCampaignData(campaign);
        setIsLoading(false);
        storeCampaignId(id);
      }
    };
    fetchCampaign();
  }, [apiContext, id]);

  const deleteCampaign = async () => {
    const result = await postRequest(
      `https://pnp-backend.fly.dev/api/v1/campaign/${id}/delete`,
    );

    console.log(result);
    if (result) {
      storeCampaignId("");
      navigate("/campaigns");
    }
  };

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
          <div className="flex gap-3 justify-between">
            <h2 className="text-3xl font-bold">{campaignData.name}</h2>
            <div className="flex gap-2">
              <EditButton type="campaign" data={campaignData} />
              <DeleteButton
                text="Warning: All characters, locations and items of the campaign will be deleted as well!"
                deleteEntry={deleteCampaign}
              />
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
