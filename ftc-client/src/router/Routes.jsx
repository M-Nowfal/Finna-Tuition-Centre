import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import HomeLayout from "../layouts/HomeLayout";
import Login from "../pages/Login";
import DashboardLayout from "../layouts/DashboardLayout";
import PageNotFound from "../pages/PageNotFound";
import Student from "../pages/Student";
import Satff from "../pages/Satff";

const Routes = () => {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
      children: [{ path: "/", element: <Home /> }],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        { path: "student", element: <Student /> },
        { path: "staff", element: <Satff /> },
      ],
    },
    {
      path: "*",
      element: <PageNotFound />,
    },
  ]);

  return <RouterProvider router={routes} />;
};

export default Routes;
