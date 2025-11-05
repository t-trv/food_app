import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { MainCategoryContextProvider } from "../context/MainCategoryContext";

const HomeLayout = () => {
  return (
    <div className="h-screen w-full">
      <div className="container h-full mx-auto py-4 flex flex-col gap-4">
        <MainCategoryContextProvider>
          <Header />
        </MainCategoryContextProvider>
        <div className="h-full w-full">
          <div className="h-full w-full bg-white rounded-2xl p-4 col-span-9">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeLayout;
