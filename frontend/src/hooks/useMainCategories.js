import { useQuery } from "@tanstack/react-query";
import apiRequest from "../libs/apiRequest";

const useMainCategories = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["/main-categories"],
    queryFn: async () => {
      const res = await apiRequest.get("/categories/main");
      return res.data.data;
    },
  });

  return {
    data,
    isLoading,
    error,
  };
};

export default useMainCategories;
