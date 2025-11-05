import { MainCategoryContextProvider } from "../context/MainCategoryContext.jsx";
import HomePage from "../pages/HomePage";
import SideFoodPage from "../pages/SideFoodPage";
import DrinkPage from "../pages/DrinkPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import MainFoodPage from "../pages/MainFoodPage";
import ShoppingLayout from "../layout/ShoppingLayout";
import HomeLayout from "../layout/HomeLayout";
import FoodDetailPage from "../pages/FoodDetailPage";

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
    element: <HomeLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
    ],
  },
  {
    path: "/",
    element: <ShoppingLayout />,
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
        path: "/drink-food",
        element: <DrinkPage />,
      },
      { path: "/foods/:slug", element: <FoodDetailPage /> },
    ],
  },
];

export default publicRoutes;
