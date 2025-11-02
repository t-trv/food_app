import { useAuthContext } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const AdminLayout = () => {
  const { currentUser } = useAuthContext();

  if (currentUser?.website !== "quadbite") {
    return <Navigate to="/login" />;
  }

  return (
    <div className="h-full w-full">
      <div className="container mx-auto my-4 flex flex-col gap-4">
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
