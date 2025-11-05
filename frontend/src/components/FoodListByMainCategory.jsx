import FoodCard from "./FoodCard";

const FoodListByMainCategory = ({ sideCategories }) => {
  const allFoods = sideCategories.flatMap((sideCategory) => sideCategory.foods);

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-4 pt-2">
      {!allFoods.length && <div>Hiện tại chưa có món ăn nào</div>}

      {allFoods.length > 0 && allFoods.map((food) => <FoodCard key={food.id} food={food} />)}
    </div>
  );
};

export default FoodListByMainCategory;
