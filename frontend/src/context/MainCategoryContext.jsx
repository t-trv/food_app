import { createContext, useContext, useEffect, useState } from "react";
import apiRequest from "../libs/apiRequest";
import toast from "react-hot-toast";

const MainCategoryContext = createContext();

export const MainCategoryContextProvider = ({ children }) => {
  const [mainCategories, setMainCategories] = useState([]);

  const fetchMainCategories = async () => {
    try {
      const res = await apiRequest.get("/categories/main");
      if (res.data.success) {
        const data = res.data.data.sort((a, b) => a.sort_order - b.sort_order);
        setMainCategories(data);
      } else {
        toast.error(res.data.message);
        setMainCategories([]);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      setMainCategories([]);
    }
  };

  useEffect(() => {
    fetchMainCategories();
  }, []);

  return (
    <MainCategoryContext.Provider value={{ mainCategories, setMainCategories }}>
      {children}
    </MainCategoryContext.Provider>
  );
};

export const useMainCategoryContext = () => {
  return useContext(MainCategoryContext);
};
