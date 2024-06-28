import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EditButton from "../../../components/buttons/editButton/EditButton";
import DeleteButton from "../../../components/buttons/deleteButton/DeleteButton";
import { apiRequest } from "../../../utility/apiRequests/apiRequest";
import useCampaignId from "../../../utility/hooks/useCampaignId";
import storeCampaignId from "../../../utility/otherFunctions/storeCampaignId";
import unescapeText from "../../../utility/otherFunctions/unescapeText";
import useDefaultImage from "../../../utility/hooks/useDefaultImage";
import Icon from "@mdi/react";

/**Displays detail data of a single campaign to the user- Allows for editing or deleting the entry. */
const CampaignDetailView = () => {
  const [campaignData, setCampaignData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [campaignId, saveCampaignId] = useCampaignId();
  const navigate = useNavigate();
  const defaultImage = useDefaultImage("campaign");

  const { id } = useParams();

  useEffect(() => {
    if (campaignId !== id) {
      saveCampaignId(id);
    }
  }, [id, saveCampaignId, campaignId]);

  useEffect(() => {
    const fetchCampaign = async () => {
      const campaign = await apiRequest(
        "GET",
        `https://pnp-backend.fly.dev/api/v1/campaign/${id}`,
      );

      setCampaignData(campaign.data);
      setIsLoading(false);
    };

    fetchCampaign();
  }, [id]);

  const updateCampaign = (data) => {
    dispatchEvent(new Event("onCampaignIdSet"));
    setCampaignData(data);
  };

  const deleteCampaign = async () => {
    const result = await apiRequest(
      "POST",
      `https://pnp-backend.fly.dev/api/v1/campaign/${id}/delete`,
    );

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
            {campaignData.image ? (
              <img
                className="w-card-image aspect-square bg-wgray-400 rounded-xl"
                src={campaignData.image}
                alt="campaign"
              />
            ) : (
              <Icon
                className="w-card-image aspect-square bg-wgray-400 rounded-xl"
                path={defaultImage}
                alt="campaign"
              />
            )}
          </div>
          <div className="flex gap-3 justify-between">
            <h2 className="text-3xl font-bold">
              {unescapeText(campaignData.name)}
            </h2>
            <div className="flex gap-2">
              <EditButton
                type="campaign"
                data={campaignData}
                updateParent={updateCampaign}
              />
              <DeleteButton
                text="Warning: All characters, locations and items of the campaign will be deleted as well!"
                deleteEntry={deleteCampaign}
              />
            </div>
          </div>
          <h3 className="font-semibold">Description</h3>
          <div className="bg-wgray-200 p-2 rounded">
            {unescapeText(campaignData.description)}
          </div>
        </div>
      </div>
    );
  }
};

export default CampaignDetailView;
