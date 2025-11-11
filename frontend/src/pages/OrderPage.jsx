import SecondaryTitle from "../components/SecondaryTitle";
import useOrderList from "../hooks/useOrderList";
import { formatCurrency } from "../libs/formatCurrency";

const OrderPage = () => {
  const { orderList } = useOrderList();

  console.log(orderList);

  return (
    <div className="h-full">
      <SecondaryTitle title="Thông tin chi tiết đơn hàng" />

      <div className="grid grid-cols-12 gap-4 mt-4 p-4 border-dashed border-2 border-gray-300 rounded-xl">
        {orderList.map((item) => (
          <div key={item.id} className="col-span-6">
            <div className="flex gap-2">
              <img src={item.image} alt={item.name} className="w-30 h-30 object-cover rounded-xl" />
              <div>
                <h2>
                  {item.name} <span className="text-sm text-gray-500">({item.variant})</span>
                </h2>
                <p>{item.quantity}</p>

                <p>{formatCurrency(item.total_price)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end p-4">
        <p>
          Tổng tiền:{" "}
          {formatCurrency(orderList.reduce((acc, item) => acc + parseFloat(item.total_price) * item.quantity, 0))}
        </p>
      </div>
    </div>
  );
};

export default OrderPage;
