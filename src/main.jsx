import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Notes from "./routes/Notes";
import Campaigns from "./routes/Campaigns";
import CampaignDetail from "./routes/CampaignDetail";
import CharacterDetail from "./routes/CharacterDetail";
import Characters from "./routes/Characters";
import Locations from "./routes/Locations";
import LocationDetail from "./routes/LocationDetail";
import Items from "./routes/Objects.jsx";
import ItemDetail from "./routes/ObjectDetail.jsx";
import "./index.css";
import LandingPage from "./routes/LandingPage.jsx";
import LogRocket from "logrocket";

LogRocket.init("ccujpl/rpg-adventure-journal");
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
      { path: "objects", element: <Items /> },
      { path: "object/:id", element: <ItemDetail /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
