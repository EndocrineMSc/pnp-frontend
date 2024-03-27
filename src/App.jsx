import Dashboard from "./routes/Dashboard";
import { ApiContext } from "./Contexts";
import { useState, useEffect } from "react";

function App() {
  const [userId, setUserId] = useState(null);
  const [currentEntryId, setViewedId] = useState(null);

  //!Only dev mode, not meant for production
  useEffect(() => {
    const login = async () => {
      let response = await fetch("https://pnp-backend.fly.dev/api/v1/login", {
        method: "POST",
        body: JSON.stringify({
          username: "Tommy the great",
          password: "ILoveBananas",
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        const tokens = await response.json();
        localStorage.setItem("accessToken", "Bearer " + tokens.accessToken);
        localStorage.setItem("refreshToken", tokens.refreshToken);
        setUserId(tokens.user._id);
      }
    };
    login();
  }, []);

  return (
    <ApiContext.Provider
      value={{ userId, setUserId, currentEntryId, setViewedId }}
    >
      <Dashboard />;
    </ApiContext.Provider>
  );
}

export default App;
