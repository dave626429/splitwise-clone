import { createBrowserRouter, Navigate } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import EventLogs from "./pages/eventlogs/EventLogs";
import Groups from "./pages/groups/Groups";
import Friends from "./pages/friends/Friends";
import Settings from "./pages/settings/Settings";
import Layout from "./components/layout/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "eventlogs",
        element: <EventLogs />,
      },
      {
        path: "groups",
        element: <Groups />,
      },
      {
        path: "friends",
        element: <Friends />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "",
        element: <Navigate to="/dashboard" />,
      },
    ],
  },
]);

export default router;
