export const postRequest = async (url, data) => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  let response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      authorization: accessToken,
      refresh: refreshToken,
    },
    credentials: "include",
  });

  const result = response.json();
  if (result.accessToken) {
    localStorage.setItem("accessToken", result.accessToken);
  }
  return result;
};
