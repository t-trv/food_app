import { useAuthContext } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import isAdmin from "../libs/isAdmin";
import AdminSidebar from "../components/admin/AdminSidebar";

const AdminLayout = () => {
  const { currentUser } = useAuthContext();

  if (currentUser?.website !== "quadbite") {
    return <Navigate to="/login" />;
  }

  const authorized = isAdmin(currentUser);

  if (!authorized) {
    return <Navigate to="/" />;
  }

  return (
    <div className="h-screen w-full animate-slide-in">
      <div className="container mx-auto py-4 flex flex-col gap-4 h-full">
        <div className="grid grid-cols-12 gap-4 h-full">
          <div className="col-span-2">
            <AdminSidebar />
          </div>
          <div className="col-span-10 h-full w-full bg-white rounded-xl p-4">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
