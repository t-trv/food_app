import SecondaryTitle from "./SecondaryTitle";
import useOrderList from "../hooks/useOrderList";
import MiniFoodCard from "./MiniFoodCard";
import EmptyState from "./EmptyState";
import { formatCurrency } from "../libs/formatCurrency";
import { useNavigate } from "react-router-dom";

const OrderList = () => {
  const { orderList } = useOrderList();
  const navigate = useNavigate();
  const totalPrice = orderList.reduce((acc, item) => acc + parseFloat(item.price) * item.quantity, 0);

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex flex-col gap-2 max-h-[calc(100vh-350px)] overflow-y-auto hide-scrollbar">
        <SecondaryTitle title="Danh sách đặt món" />
        {orderList && orderList.length > 0 ? (
          orderList.map((item, index) => <MiniFoodCard key={index} item={item} />)
        ) : (
          <EmptyState title="Chưa có món ăn nào trong giỏ hàng" className="text-secondary text-center text-sm" />
        )}
      </div>

      {orderList && orderList.length > 0 && (
        <div className="flex flex-col gap-4 ">
          <div>
            <div className="grid grid-cols-2 gap-2 items-center border-t border-b border-dashed border-gray-300 py-2">
              <span className="text-md font-semibold">Mã giảm giá</span>
              <input type="text" placeholder="Nhập mã giảm giá" className="w-full  rounded-xl py-1 px-2 outline-none" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <span>Số tiền được giảm:</span>
              <span>{formatCurrency(0)}</span>
            </div>

            <div className="flex justify-between">
              <span>Chí phí giao hàng:</span>
              <span>{formatCurrency(0)}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-lg font-semibold">Tổng cộng:</span>
              <span className="text-lg font-semibold">{formatCurrency(totalPrice)}</span>
            </div>
          </div>

          <div>
            <button
              onClick={() => {
                navigate("/order");
              }}
              className={`w-full bg-primary text-white rounded-xl py-2 ${
                orderList && orderList.length > 0
                  ? "cursor-pointer hover:scale-105 transition-all duration-300 active:scale-95"
                  : "cursor-not-allowed opacity-50"
              }`}
            >
              Đặt hàng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderList;
