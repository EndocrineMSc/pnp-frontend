import Dashboard from "./routes/Dashboard";
import { ApiContext } from "./Contexts";
import { useState } from "react";

function App() {
  const [campaignId, setCampaignId] = useState("");
  const [isLoggedIn, setLoggedIn] = useState(false);

  return (
    <ApiContext.Provider
      value={{
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
