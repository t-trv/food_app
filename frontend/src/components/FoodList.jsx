import EmptyState from "./EmptyState";
import FoodCard from "./FoodCard";

const FoodList = ({ foods }) => {
  return foods && foods.length > 0 ? (
    <div className="grid grid-cols-5 gap-4">
      {foods.map((food) => (
        <FoodCard key={food.id} food={food} />
      ))}
    </div>
  ) : (
    <EmptyState title="Không có món ăn nào" />
  );
};

export default FoodList;
