import { useQuery } from "@tanstack/react-query";
import apiRequest from "../libs/apiRequest";

const useVariants = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["/variants"],
    queryFn: async () => {
      const res = await apiRequest.get("/variants");
      return res.data.data;
    },
  });

  return {
    data,
    isLoading,
    error,
  };
};

export default useVariants;
