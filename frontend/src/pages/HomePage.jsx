import SecondaryTitle from "../components/SecondaryTitle";
import Category from "../components/Category";

const HomePage = () => {
  return (
    <div className="h-full w-full bg-white rounded-2xl p-4">
      <SecondaryTitle title="Danh mục món ăn" />
      <Category
        list={[
          { id: "pasta", title: "Pasta" },
          { id: "pizza", title: "Pizza" },
          { id: "burger", title: "Burger" },
          { id: "sandwich", title: "Sandwich" },
          { id: "salad", title: "Salad" },
          { id: "soup", title: "Soup" },
          { id: "noodles", title: "Noodles" },
          { id: "rice", title: "Rice Dishes" },
          { id: "seafood", title: "Seafood" },
          { id: "chicken", title: "Chicken Dishes" },
          { id: "beef", title: "Beef Dishes" },
          { id: "dessert", title: "Desserts" },
          { id: "drinks", title: "Drinks" },
          { id: "coffee", title: "Coffee & Tea" },
          { id: "appetizer", title: "Appetizers" },
          { id: "vegetarian", title: "Vegetarian" },
          { id: "bbq", title: "BBQ & Grilled" },
          { id: "fastfood", title: "Fast Food" },
          { id: "asian", title: "Asian Cuisine" },
          { id: "western", title: "Western Cuisine" },
          { id: "other", title: "Other" },
        ]}
      />
    </div>
  );
};

export default HomePage;
