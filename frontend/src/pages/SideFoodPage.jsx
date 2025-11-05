import SecondaryTitle from "../components/SecondaryTitle";
import Category from "../components/Category";
import { useEffect, useMemo, useState } from "react";
import apiRequest from "../libs/apiRequest";
import FoodListBySideCategory from "../components/FoodListBySideCategory";

const SideFoodPage = () => {
  const [sideCategories, setSideCategories] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);

  // Lấy ra dữ liệu của danh mục phụ đang active
  const activeCategoryData = useMemo(() => {
    return sideCategories?.find((category) => category.id === activeCategory)?.foods || [];
  }, [sideCategories, activeCategory]);

  // fetch tất cả danh mục phụ của main-food
  useEffect(() => {
    const fetchSideCategories = async () => {
      try {
        const res = await apiRequest.get("foods/by-category/side-food");
        if (res.data.success) {
          setSideCategories(res.data.data.side_categories);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchSideCategories();
  }, []);

  return (
    <div>
      <SecondaryTitle title={`Danh mục món ăn`} />

      {sideCategories?.length > 0 && (
        <Category list={sideCategories} activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
      )}

      {!activeCategory && <div>asb</div>}

      {!!activeCategory && (
        <div>
          <FoodListBySideCategory foods={activeCategoryData} />
        </div>
      )}
    </div>
  );
};

export default SideFoodPage;
