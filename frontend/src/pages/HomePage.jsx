import SecondaryTitle from "../components/SecondaryTitle";
import Category from "../components/Category";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Loading from "../components/Loading";

const HomePage = () => {
  const [categories, setCategories] = useState([
    { id: "com", title: "Cơm" },
    { id: "banh-mi", title: "Bánh Mì" },
    { id: "my", title: "Mỳ" },
    { id: "bun", title: "Bún" },
    { id: "pho", title: "Phở" },
    { id: "mon-cuon", title: "Món Cuốn" },
    { id: "xoi", title: "Xôi" },
    { id: "thit", title: "Thịt" },
  ]);

  const [currentCategory, setCurrentCategory] = useState(categories[0]);
  const [currentSearchParams, setCurrentSearchParams] = useSearchParams("");

  useEffect(() => {
    const category =
      categories.find(
        (category) => category.id === currentSearchParams.get("category")
      ) || categories[0];
    setCurrentCategory(category);
  }, [currentSearchParams]);

  return (
    <div className="h-full w-full bg-white rounded-2xl p-4">
      <SecondaryTitle
        title={`Danh mục món ăn - Hiện tại: ${currentCategory?.title}`}
      />
      <Category list={categories} />
    </div>
  );
};

export default HomePage;
