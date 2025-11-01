import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const Layout = () => {
  return (
    <div className="h-full w-full">
      <div className="container mx-auto my-4  flex flex-col gap-4">
        <Header />
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
