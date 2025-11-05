import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ShoppingLayout from "../layout/ShoppingLayout";
import HomeLayout from "../layout/HomeLayout";
import FoodMenu from "../components/FoodMenu";
import FoodDetail from "../components/FoodDetail";

const publicRoutes = [
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  {
    path: "/",
    element: <HomeLayout />,
    children: [{ path: "/", element: <HomePage /> }],
  },
  {
    path: "/",
    element: <ShoppingLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/:mainCategory", element: <FoodMenu /> },
      { path: "/:mainCategory/:slug", element: <FoodDetail /> },
    ],
  },
];

export default publicRoutes;
