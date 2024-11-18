import { createBrowserRouter, Navigate, redirect } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import EventLogs from "./pages/eventlogs/EventLogs";
import Groups from "./pages/groups/Groups";
import Friends from "./pages/friends/Friends";
import Settings from "./pages/settings/Settings";
import Layout from "./components/layout/Layout";
import Login from "./pages/login/Login";

import apiClient from "./ultils/apiClient";

const loader = async ({ request }) => {
  try {
    const res = await apiClient.get("/auth/issessionvalid");
    const url = new URL(request.url);
    console.log(res);

    // TODO : implement proper session logic for new page
    if (res.data) {
      return null;
    }

    return redirect("/login");
  } catch (error) {
    console.log(error);
    return null;
  }
};

const LoginLoader = async ({ request }) => {
  const res = await apiClient.get("/auth/issessionvalid");
  const url = new URL(request.url);

  if (res.data) {
    return redirect("/dashboard");
  }
  return null;
};

const router = createBrowserRouter([
  {
    path: "/login",
    loader: LoginLoader,
    element: <Login />,
  },

  {
    path: "/",
    element: <Layout />,
    loader: loader,
    children: [
      {
        path: "dashboard",
        loader: loader,
        element: <Dashboard />,
      },
      {
        path: "eventlogs",
        loader: loader,
        element: <EventLogs />,
      },
      {
        path: "groups",
        loader: loader,
        element: <Groups />,
      },
      {
        path: "friends",
        loader: loader,
        element: <Friends />,
      },
      {
        path: "settings",
        loader: loader,
        element: <Settings />,
      },
      {
        path: "*",
        element: <Navigate to="/dashboard" />,
      },
      {
        path: "",
        element: <Navigate to="/dashboard" />,
      },
    ],
  },
]);

export default router;
