import SecondaryTitle from "../components/SecondaryTitle";
import Category from "../components/Category";
import { useEffect, useMemo, useState } from "react";
import apiRequest from "../libs/apiRequest";
import FoodListBySideCategory from "../components/FoodListBySideCategory";
import FoodListByMainCategory from "../components/FoodListByMainCategory";
import Loading from "../components/Loading";

const MainFoodPage = () => {
  const [sideCategories, setSideCategories] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Lấy ra dữ liệu (foods) của danh mục phụ đang active
  const activeCategoryData = useMemo(() => {
    return sideCategories?.find((category) => category.id === activeCategory)?.foods || [];
  }, [sideCategories, activeCategory]);

  // fetch tất cả danh mục phụ của main-food (sidecate + foods)
  useEffect(() => {
    const fetchSideCategories = async () => {
      try {
        setIsLoading(true);
        const res = await apiRequest.get("foods/by-category/main-food");
        if (res.data.success) {
          setSideCategories(res.data.data.side_categories);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      }
    };

    fetchSideCategories();
  }, []);

  return (
    <div className="relative h-full">
      <SecondaryTitle title={`Danh mục món ăn`} />

      {!!sideCategories && sideCategories?.length > 0 && (
        <Category list={sideCategories} activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
      )}

      {/* Chưa chọn side category nào */}
      {!activeCategory && sideCategories?.length > 0 && <FoodListByMainCategory sideCategories={sideCategories} />}

      {/* Đã chọn side category */}
      {!!activeCategory && <FoodListBySideCategory foods={activeCategoryData} />}

      {isLoading && <Loading title="Vui lòng chờ trong giây lát..." />}
    </div>
  );
};

export default MainFoodPage;
