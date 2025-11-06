import AdminLayout from "../layout/AdminLayout";
import AdminPage from "../pages/admin/AdminPage";
import AdminUsersPage from "../pages/admin/AdminUsersPage";
import AdminFoodsPage from "../pages/admin/AdminFoodsPage";

const adminRoute = [
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "/admin/dashboard",
        element: <AdminPage />,
      },
      {
        path: "/admin/dashboard/users",
        element: <AdminUsersPage />,
      },
      {
        path: "/admin/dashboard/foods",
        element: <AdminFoodsPage />,
      },
    ],
  },
];

export default adminRoute;
