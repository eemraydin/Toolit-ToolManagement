import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
//Pages
import Dashboard from "./pages/dashboard/dashboard";
import NotFound from "./pages/404";
import Room, { loader as roomDetailLoader } from "./pages/roomDetails";
import Rooms, { loader as roomLoader } from "./pages/rooms";
import RoomForm from "./components/forms/RoomForm";
import ItemForm from "./components/forms/ItemForm";
import RoomItems, {
  loader as roomItemLoader,
} from "./components/forms/RoomItemsForm";
import RoomItemsNew, {
  loader as roomItemNewLoader,
} from "./components/forms/RoomItemsNewForm";
import Inventory from "./pages/inventory";
import ProjectTeam, { loader as projectTeamLoader } from "./pages/projectTeam";
import Project, { loader as projectDetailLoader } from "./pages/projectDetails";
import Projects, { loader as projectLoader } from "./pages/projects";
import ProjectForm from "./components/forms/ProjectForm";
import StockIssues, { loader as issueLoader } from "./pages/stockIssues";
import Items, { loader as itemLoader } from "./components/items/itemDetails";
import ItemList, {
  loader as itemListLoader,
} from "./components/itemLists/ItemList";
import Base from "./pages/base";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Search from "./pages/search";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import Landing from "./pages/landing";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/home",
        element: <Dashboard />,
      },
      {
        path: "/search",
        element: <Search />,
        loader: itemListLoader,
      },
      {
        path: "/search/:itemName",
        element: <Search />,
        loader: itemListLoader,
      },
      {
        path: "/items/*",
        element: <Inventory />,
        loader: itemListLoader,
      },
      {
        path: "/items/new",
        element: <Base content={<ItemForm />} title="Add New Item" />,
      },
      {
        path: "/items/:id",
        loader: itemLoader,
        element: <Items />,
      },
      {
        path: "/projects/*",
        element: <Projects />,
        loader: projectLoader,
      },
      {
        path: "/issues",
        element: <StockIssues />,
        loader: issueLoader,
      },
      {
        path: "/rooms/new",
        element: <RoomForm />,
      },
      {
        path: "/rooms/*",
        element: <Rooms />,
        loader: roomLoader,
      },
      {
        path: "/rooms/:id",
        loader: roomDetailLoader,
        element: <Room />,
      },
      {
        path: "/rooms/items/:roomId",
        loader: roomItemLoader,
        element: <RoomItems />,
      },
      {
        path: "/rooms/items/new/:roomId",
        loader: roomItemNewLoader,
        element: <RoomItemsNew />,
      },
      {
        path: "/projects/new",
        element: <ProjectForm />,
      },
      {
        path: "/projects/teams/:id",
        loader: projectTeamLoader,
        element: <ProjectTeam />,
      },
      {
        path: "/projects/:id",
        loader: projectDetailLoader,
        element: <Project />,
      },
      {
        path: "/projects",
        element: <Projects />,
        loader: projectLoader,
      },

      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "/login",
    element: (
      <ThemeProvider theme={theme}>
        <Login />
      </ThemeProvider>
    ),
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(

    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>

);
