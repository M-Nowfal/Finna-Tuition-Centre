import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import HomeLayout from "../layouts/HomeLayout";
import Login from "../pages/Login";
import DashboardLayout from "../layouts/DashboardLayout";
import PageNotFound from "../pages/PageNotFound";
import Student from "../pages/Student";
import Staff from "../pages/Staff";
import Registration from "../pages/Registration";
import Review from "../pages/Review";

const Routes = () => {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/reviews", element: <Review /> }
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register/:role",
      element: <Registration />,
    },
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        { path: "student", element: <Student /> },
        { path: "staff", element: <Staff /> },
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
