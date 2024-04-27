/**Send a get request with authorization handling */
export const getRequest = async (url) => {
  console.log("get Request with url: " + url);
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  let response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: accessToken,
      refresh: refreshToken,
    },
    credentials: "include",
  });

  const result = await response.json();
  if (result.accessToken) {
    localStorage.setItem("accessToken", result.accessToken);
  }
  return result;
};
