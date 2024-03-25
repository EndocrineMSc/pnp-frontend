import { useState, useEffect } from "react";
import DetailButton from "../components/basic-ui/DetailButton";

const CampaignDetailView = ({ campaignId }) => {
  const [campaignData, setCampaignData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  /*
  useEffect(() => {
    const fetchCampaign = async () => {
      let response = await fetch(
        `https://pnp-packend.fly.dev/api/v1/${campaignId}`,
      );
      // try again after possible token refresh
      if (response.status === 401) {
        const newAccessToken = await response.json();
        if (response.status === 200) {
          localStorage.setItem("accessToken", "Bearer " + newAccessToken);
          response = await fetch(
            `https://pnp-packend.fly.dev/api/v1/${campaignId}`,
          );
        }
      }

      if (response.status === 200) {
        const campaign = await response.json();
        setCampaignData(campaign);
        setLoading(false)
      }
    };
    fetchCampaign();
  }, [campaignId]);
  */

  //testing
  useEffect(() => {
    setCampaignData({
      name: "Test campaign",
      description:
        "Upon a wednesday night, doves danced above the moonlight. And swarmed the beaches of normandy, defeating many of soldier with white-greyish pp",
    });
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <></>;
  } else {
    return (
      <div className="flex justify-center items-start w-full h-screen p-2">
        <div className="flex flex-col gap-3 p-4 bg-wgray-300 rounded-xl max-w-screen-sm">
          <div className="flex justify-center align-center w-full">
            <img
              className="w-[150px] aspect-square bg-wgray-400 rounded-xl"
              src={
                campaignData.image
                  ? campaignData.image
                  : "./public/campaign.svg"
              }
              alt="campaign"
            />
          </div>
          <div className="flex justify-between">
            <h2 className="text-3xl font-bold">{campaignData.name}</h2>
            <div className="flex gap-2">
              <DetailButton type="edit" />
              <DetailButton type="delete" />
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
