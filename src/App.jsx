import Dashboard from "./routes/Dashboard";
import { ApiContext } from "./Contexts";

function App() {
  return (
    <ApiContext.Provider value={null}>
      <Dashboard />;
    </ApiContext.Provider>
  );
}

export default App;
