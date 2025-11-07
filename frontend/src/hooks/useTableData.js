import { useQuery } from "@tanstack/react-query";
import apiRequest from "../libs/apiRequest";

// Muốn sử dụng hook này thì res phải là dạng mảng, mỗi phần tử là 1 row trong mảng
export const useTableData = (endpoint) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [endpoint],
    queryFn: async () => {
      const res = await apiRequest.get(endpoint);
      return res.data.data;
    },
    staleTime: 1000 * 60 * 60 * 1, // 1 hour
  });

  return {
    data,
    isLoading,
    error,
  };
};
