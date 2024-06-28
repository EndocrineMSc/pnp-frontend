import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Notes from "./pages/notes/Notes";
import Campaigns from "./pages/campaigns/Campaigns";
import Characters from "./pages/characters/Characters";
import Locations from "./pages/locations/Locations";
import Objects from "./pages/objects/Objects";
import LandingPage from "./pages/landingPage/LandingPage";
import CampaignDetail from "./pages/detailViews/campaignDetail/CampaignDetail";
import CharacterDetail from "./pages/detailViews/characterDetail/CharacterDetail";
import LocationDetail from "./pages/detailViews/locationDetail/LocationDetail";
import ObjectDetail from "./pages/detailViews/objectDetail/ObjectDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "welcome", element: <LandingPage /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "notes", element: <Notes /> },
      { path: "campaigns", element: <Campaigns /> },
      { path: "campaign/:id", element: <CampaignDetail /> },
      { path: "characters", element: <Characters /> },
      { path: "character/:id", element: <CharacterDetail /> },
      { path: "locations", element: <Locations /> },
      { path: "location/:id", element: <LocationDetail /> },
      { path: "objects", element: <Objects /> },
      { path: "object/:id", element: <ObjectDetail /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
