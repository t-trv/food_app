import Layout from "../layout/Layout";
import HomePage from "../pages/HomePage";
import SideFoodPage from "../pages/SideFoodPage";
import DrinkPage from "../pages/DrinkPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

const publicRoutes = [
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/side-food",
        element: <SideFoodPage />,
      },
      {
        path: "/drink",
        element: <DrinkPage />,
      },
    ],
  },
];

export default publicRoutes;
