import { createContext, useContext, useEffect, useState } from "react";
import apiRequest from "../libs/apiRequest";
import toast from "react-hot-toast";

const CategoryContext = createContext();

export const CategoryContextProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const res = await apiRequest.get("/categories/all");
      if (res.data.success) {
        const data = res.data.data.sort((a, b) => a.sort_order - b.sort_order);
        setCategories(data);
      } else {
        toast.error(res.data.message);
        setCategories([]);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      setCategories([]);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <CategoryContext.Provider value={{ categories, setCategories }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategoryContext = () => {
  return useContext(CategoryContext);
};
