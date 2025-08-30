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
import ForgotPassword from "../sections/staff/ForgotPassword";
import ResetPassword from "../sections/staff/ResetPassword";
import AddAdmin from "../pages/AddAdmin";
import AddStaff from "../pages/AddStaff";

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
      path: "/forgot-password",
      element: <ForgotPassword />
    },
    {
      path: "/reset-password",
      element: <ResetPassword />
    },
    {
      path: "/add-admin",
      element: <AddAdmin />
    },
    {
      path: "/add-staff",
      element: <AddStaff />
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
