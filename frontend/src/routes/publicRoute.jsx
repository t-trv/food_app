import Layout from "../layout/Layout";
import HomePage from "../pages/HomePage";
import SideFoodPage from "../pages/SideFoodPage";
import DrinkPage from "../pages/DrinkPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import MainFoodPage from "../pages/MainFoodPage";
import PromotionsPage from "../pages/PromotionsPage";

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
        path: "/main-food",
        element: <MainFoodPage />,
      },
      {
        path: "/side-food",
        element: <SideFoodPage />,
      },
      {
        path: "/drink",
        element: <DrinkPage />,
      },
      {
        path: "/promotions",
        element: <PromotionsPage />,
      },
    ],
  },
];

export default publicRoutes;
