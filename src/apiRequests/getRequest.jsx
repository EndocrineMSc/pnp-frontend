/**Send a get request with authorization handling */
export const getRequest = async (url) => {
  console.log("get Request with url: " + url);
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  console.log(accessToken);
  console.log(refreshToken);

  let response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: accessToken,
      refresh: refreshToken,
    },
    credentials: "include",
  });

  console.log(response);

  // try again after possible token refresh
  if (response.status === 401) {
    const newAccessToken = await response.json();
    if (response.status === 200) {
      localStorage.setItem("accessToken", "Bearer " + newAccessToken);
      response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: accessToken,
          refresh: refreshToken,
          credentials: "include",
        },
      });
    }
  }

  const result = await response.json();
  return result;
};
