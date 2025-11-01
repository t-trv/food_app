import RequiredAuthLayout from "../layout/RequiredAuthLayout";
import UpdateProfilePage from "../pages/UpdateProfilePage";

const requiredAuthRoute = [
  {
    path: "/",
    element: <RequiredAuthLayout />,
    children: [
      {
        path: "/update-profile",
        element: <UpdateProfilePage />,
      },
    ],
  },
];

export default requiredAuthRoute;
