import SecondaryTitle from "./SecondaryTitle";
import useOrderList from "../hooks/orderList";
import MiniFoodCard from "./MiniFoodCard";
import EmptyState from "./EmptyState";

const OrderList = () => {
  const { orderList } = useOrderList();

  console.log(orderList);

  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <SecondaryTitle title="Danh sách đặt món" />
        {orderList && orderList.length > 0 ? (
          orderList.map((item) => <MiniFoodCard key={item?.id} item={item} />)
        ) : (
          <EmptyState title="Chưa có món ăn nào trong giỏ hàng" className="text-secondary text-center text-sm" />
        )}
      </div>

      <div className="flex flex-col gap-2">
        <div>
          <div>
            <label>Mã giảm giá</label>
            <input
              type="text"
              placeholder="Nhập mã giảm giá"
              className="w-full border-2 border-gray-300 rounded-xl py-2 px-4 outline-none"
            />
          </div>
        </div>

        <div>
          <button
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
    </div>
  );
};

export default OrderList;
