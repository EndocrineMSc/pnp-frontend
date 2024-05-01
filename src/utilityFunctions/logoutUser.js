import { apiRequest } from "../apiRequests/apiRequest";

export default function useLogout() {
  const rToken = localStorage.getItem("refreshToken");

  apiRequest("POST", "https://rpg-adventure-journal.vercel.app/api/v1/logout", {
    token: rToken,
  });

  localStorage.setItem("accessToken", "");
  localStorage.setItem("refreshToken", "");
  localStorage.setItem("campaignId", "");
  localStorage.setItem("userId", "");
}
