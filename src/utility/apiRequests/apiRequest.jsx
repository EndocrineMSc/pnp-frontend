/**Send an api request with authorization handling
 * @param {string} reqType - "POST", "GET"
 * @param {string} url
 * @param {object} data - only for POST requests
 */
export const apiRequest = async (reqType, url, data) => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  const opts = {
    method: reqType,
    body: reqType === "POST" ? JSON.stringify(data) : null,
    headers: {
      "Content-Type": "application/json",
      authorization: accessToken,
      refresh: refreshToken,
    },
    credentials: "include",
  };

  const response = await fetch(url, opts);
  const result = await response.json();

  if (result.accessToken) {
    localStorage.setItem("accessToken", "Bearer " + result.accessToken);
  }
  return { success: response.ok, data: result };
};
