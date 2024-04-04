import Dashboard from "./routes/Dashboard";
import { ApiContext } from "./Contexts";
import { useState } from "react";

function App() {
  const [userId, setUserId] = useState(null);
  const [campaignId, setCampaignId] = useState("");
  const [isLoggedIn, setLoggedIn] = useState(false);

  return (
    <ApiContext.Provider
      value={{
        userId,
        setUserId,
        campaignId,
        setCampaignId,
        isLoggedIn,
        setLoggedIn,
      }}
    >
      <Dashboard isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />
    </ApiContext.Provider>
  );
}

export default App;
