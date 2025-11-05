import SecondaryTitle from "./SecondaryTitle";
import useOrderList from "../hooks/orderList";

const OrderList = () => {
  const { orderList, removeFromOrderList } = useOrderList();

  console.log(orderList);

  return (
    <div>
      <SecondaryTitle title="Danh sách đặt món" />
      {orderList.map((item) => (
        <div key={item.id}>
          <h3>{item.name}</h3>
          <p>{item.price}</p>
          <button onClick={() => removeFromOrderList(item.id)}>Xóa</button>
        </div>
      ))}
    </div>
  );
};

export default OrderList;
