import { useQuery } from "@tanstack/react-query";
import apiRequest from "../libs/apiRequest";
import Loading from "./Loading";
import FoodCard from "./FoodCard";
import { useMemo } from "react";

const RecommendedFoods = ({ side_category_id, slug }) => {
  const { isLoading, data } = useQuery({
    queryKey: ["recommended-foods", side_category_id],
    queryFn: async () => {
      const res = await apiRequest.get(`/foods/by-side-category/${side_category_id}`);
      return res.data.data;
    },
    staleTime: 1000 * 60 * 60 * 24,
    enabled: !!side_category_id,
  });

  const recommendedFoods = useMemo(() => {
    return data?.filter((food) => food.slug !== slug) || [];
  }, [data, slug]);

  if (isLoading) return <Loading />;

  return (
    <div className="grid grid-cols-3 gap-4">
      {recommendedFoods.map((food) => (
        <FoodCard key={food.id} food={food} />
      ))}
    </div>
  );
};

export default RecommendedFoods;
