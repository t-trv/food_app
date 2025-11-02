import SecondaryTitle from "../components/SecondaryTitle";
import { useCategoryContext } from "../context/CategoryContext";
import Category from "../components/Category";
import { useState } from "react";

const MainFoodPage = () => {
  const { categories } = useCategoryContext();
  const [activeCategory, setActiveCategory] = useState(null);
  const mainFoodCategories =
    categories.filter((category) => category.path === "/main-food")?.at(0)
      ?.side_categories || [];

  console.log(!!activeCategory);

  return (
    <div>
      <SecondaryTitle title={`Danh mục món ăn`} />

      {mainFoodCategories.length > 0 && (
        <Category
          list={mainFoodCategories}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
      )}

      {!activeCategory && (
        <div>
          <h1>Danh sách 1</h1>
        </div>
      )}

      {!!activeCategory && (
        <div>
          <h1>Danh sách 2</h1>
        </div>
      )}
    </div>
  );
};

export default MainFoodPage;
