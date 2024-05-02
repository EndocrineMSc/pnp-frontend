import { useState, useEffect } from "react";

export default function useCampaignId() {
  const [campaignId, setCampaignId] = useState("");

  const getId = () => {
    const id = localStorage.getItem("campaignId");
    if (id) setCampaignId(id);
  };

  const saveCampaignId = (id) => {
    localStorage.setItem("campaignId", id);
    dispatchEvent(new Event("onCampaignIdSet"));
  };

  window.addEventListener("onCampaignIdSet", getId);

  useEffect(() => {
    getId();

    return () => {
      window.removeEventListener("onCampaignIdSet", getId);
    };
  }, []);

  return [campaignId, saveCampaignId];
}
