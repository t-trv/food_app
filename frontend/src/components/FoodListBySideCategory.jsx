import FoodCard from "./FoodCard";
import EmptyState from "./EmptyState";

const FoodListBySideCategory = ({ foods }) => {
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-4 pt-2">
      {!foods.length && <EmptyState title="Hiện tại chưa có món ăn nào" className="col-span-3" />}

      {foods.length > 0 && foods.map((food) => <FoodCard key={food.id} food={food} />)}
    </div>
  );
};

export default FoodListBySideCategory;
