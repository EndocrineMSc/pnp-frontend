import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Login from "./routes/Login";
import Notes from "./routes/Notes";
import Campaigns from "./routes/Campaigns";
import CampaignDetail from "./routes/CampaignDetail";
import Characters from "./routes/Characters";
import Locations from "./routes/Locations";
import Items from "./routes/Items";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "login", element: <Login /> },
      { path: "notes", element: <Notes /> },
      { path: "campaigns", element: <Campaigns /> },
      { path: "campaign", element: <CampaignDetail /> },
      { path: "characters", element: <Characters /> },
      { path: "locations", element: <Locations /> },
      { path: "objects", element: <Items /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
