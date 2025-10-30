import { Navigate, Outlet } from "react-router-dom";
import Header from "../components/Header";
import { useAuthContext } from "../context/AuthContext";

const Layout = () => {
  return (
    <div className="min-h-screen w-full">
      <div className="container mx-auto my-4  flex flex-col gap-4">
        <Header />
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const RequiredAuthLayout = () => {
  const { currentUser } = useAuthContext();

  if (currentUser?.website !== "quadbite") {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen w-full">
      <div className="container mx-auto my-4  flex flex-col gap-4">
        <Header />
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export { Layout, RequiredAuthLayout };
