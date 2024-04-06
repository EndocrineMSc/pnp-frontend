export default function storeCampaignId(campaignId) {
  window.localStorage.setItem("campaignId", campaignId);
  window.dispatchEvent(new Event("onCampaignIdSet"));
}
