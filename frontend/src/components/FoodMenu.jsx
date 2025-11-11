import { useParams } from "react-router-dom";
import apiRequest from "../libs/apiRequest";
import { useQuery } from "@tanstack/react-query";
import Loading from "../components/Loading";
import ListSideCategory from "./ListSideCategory";
import SecondaryTitle from "./SecondaryTitle";
import FoodList from "./FoodList";
import { useState } from "react";

const FoodMenu = () => {
  const { mainCategory } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["food-menu", mainCategory],
    queryFn: async () => {
      const res = await apiRequest.get(`/foods/by-category/${mainCategory}`);
      return res.data.data;
    },
    staleTime: 1000 * 60 * 60 * 1, // 1 hour
    enabled: !!mainCategory,
  });
  const [selectedSideCategory, setSelectedSideCategory] = useState(null);

  if (isLoading || !data || !mainCategory) return <Loading />;

  const categoryName = data.name;
  const sideCategories = data.side_categories;
  const foods = selectedSideCategory
    ? data.side_categories.find((sideCategory) => sideCategory.id === selectedSideCategory)?.foods || []
    : data.side_categories.flatMap((sideCategory) => sideCategory.foods);

  return (
    <div className="overflow-y-auto h-full">
      <SecondaryTitle title={`Danh mục ${categoryName}`} />

      <div className="px-1 py-3">
        <ListSideCategory
          sideCategories={sideCategories}
          selectedSideCategory={selectedSideCategory}
          setSelectedSideCategory={setSelectedSideCategory}
        />
      </div>

      <div className="animate-slide-in max-h-[calc(100vh-200px)] overflow-y-auto hide-scrollbar py-2">
        <FoodList foods={foods} />
      </div>
    </div>
  );
};

export default FoodMenu;
