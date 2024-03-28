export const getRequest = async (url) => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  let response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: accessToken,
      refresh: refreshToken,
    },
  });

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
        },
      });
    }
  }
  const result = await response.json();
  return result;
};
