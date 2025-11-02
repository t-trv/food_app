import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const Layout = () => {
  return (
    <div className="h-full w-full">
      <div className="container mx-auto my-4  flex flex-col gap-4">
        <Header />
        <div className="h-full w-full bg-white rounded-2xl p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
