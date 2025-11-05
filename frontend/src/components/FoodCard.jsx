import toast from "react-hot-toast";
import randomFoodImage from "../libs/randomFoodImage";
import { useNavigate } from "react-router-dom";
import useOrderList from "../hooks/orderList";

const FoodCard = ({ food }) => {
  const navigate = useNavigate();
  const { orderList, addToOrderList } = useOrderList();
  const foodImage = randomFoodImage();

  return (
    <div
      onClick={(e) => {
        if (e.target.closest(".order-btn")) {
          return;
        } else {
          navigate(`/foods/${food.slug}`);
        }
      }}
      className="border-2 border-dashed border-stone-300 rounded-2xl p-4 flex gap-2 cursor-pointer hover:translate-y-[-5px] transition-all duration-300 hover:shadow-xl"
    >
      <div
        className="w-30 h-30 shrink-0 aspect-square rounded-full overflow-hidden"
        style={{
          backgroundImage: `url(${food.image || foodImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      <div className="flex flex-col gap-2  justify-between flex-1">
        <div>
          <h2 className="text-xl font-medium">{food.name}</h2>
          {/* <p className="text-sm text-gray-500">{food.description}</p> */}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-primary">{food.price}đ </span>
          <span className="text-sm text-gray-500">Giảm {food.discount ? food.discount : ""}đ</span>
        </div>
        <div className="flex justify-end items-center ">
          <button
            onClick={() => {
              addToOrderList(food);
            }}
            className="order-btn bg-secondary text-white px-3 py-1 rounded-full text-sm cursor-pointer"
          >
            Đặt món
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
