import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { MainCategoryContextProvider } from "../context/MainCategoryContext";
import AddressList from "../components/AddressList";

const OrderLayout = () => {
  return (
    <div className="h-screen w-full">
      <div className="container h-full mx-auto py-4 flex flex-col gap-4">
        <MainCategoryContextProvider>
          <Header />
        </MainCategoryContextProvider>

        <div className="h-full w-full grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="h-full w-full bg-white rounded-2xl p-4 col-span-9 relative">
            <Outlet />
          </div>

          <div className="h-full w-full bg-white rounded-2xl p-4 col-span-3">
            <AddressList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderLayout;
