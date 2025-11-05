import { createContext, useContext, useEffect, useState } from "react";
import apiRequest from "../libs/apiRequest";
import toast from "react-hot-toast";

const SideCategoryContext = createContext();

export const SideCategoryContextProvider = ({ children }) => {
  const [allSideCategories, setAllSideCategories] = useState([]);

  const fetchSideCategories = async () => {
    try {
      const res = await apiRequest.get("/categories/side");
      if (res.data.success) {
        const data = res.data.data.sort((a, b) => a.sort_order - b.sort_order);
        setAllSideCategories(data);
      } else {
        toast.error(res.data.message);
        setAllSideCategories([]);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      setAllSideCategories([]);
    }
  };

  useEffect(() => {
    fetchSideCategories();
  }, []);

  return (
    <SideCategoryContext.Provider value={{ allSideCategories, setAllSideCategories }}>
      {children}
    </SideCategoryContext.Provider>
  );
};

export const useSideCategoryContext = () => {
  return useContext(SideCategoryContext);
};
