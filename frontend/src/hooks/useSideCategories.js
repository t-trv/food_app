import { useQuery } from "@tanstack/react-query";
import apiRequest from "../libs/apiRequest";

const useSideCategories = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["/side-categories"],
    queryFn: async () => {
      const res = await apiRequest.get("/categories/side");
      return res.data.data;
    },
  });

  return {
    data,
    isLoading,
    error,
  };
};

export default useSideCategories;
