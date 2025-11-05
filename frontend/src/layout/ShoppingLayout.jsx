import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import OrderList from "../components/OrderList";
import { MainCategoryContextProvider } from "../context/MainCategoryContext";

const ShoppingLayout = () => {
  return (
    <div className="h-screen w-full">
      <div className="container h-full mx-auto py-4 flex flex-col gap-4">
        <MainCategoryContextProvider>
          <Header />
        </MainCategoryContextProvider>
        <div className="h-full w-full grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="h-full w-full bg-white rounded-2xl p-4 col-span-9">
            <Outlet />
          </div>

          <div className="h-full w-full bg-white rounded-2xl p-4 col-span-3">
            <OrderList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingLayout;
