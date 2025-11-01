import AdminLayout from "../layout/AdminLayout";
import AdminPage from "../pages/AdminPage";

const adminRoute = [
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "/admin/dashboard",
        element: <AdminPage />,
      },
    ],
  },
];

export default adminRoute;
