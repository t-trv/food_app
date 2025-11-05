import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import apiRequest from "../libs/apiRequest";
import Loading from "../components/Loading";
import { ArrowLeft, MinusIcon, PlusIcon } from "lucide-react";
import RecommendedFoods from "../components/RecommendedFoods";
import { useState } from "react";

const FoodDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const foodUrl = "https://i.pinimg.com/1200x/53/68/0e/53680e1fcdab6939478b5d5e81b21005.jpg";
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // Fetch food data
  const {
    data: food,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["food", slug],
    queryFn: async () => {
      const res = await apiRequest.get(`/foods/slug/${slug}`);
      return res.data.data;
    },
    staleTime: 1000 * 60 * 5,
    enabled: !!slug,
  });

  // Handle loading state
  if (isLoading) return null;
  if (isError) return <div>Error: {error.message}</div>;

  console.log(food);

  return (
    <div className="flex flex-col justify-between h-full p-4">
      <div>
        <div className="mb-4">
          <button onClick={() => navigate(-1)} className="rounded-full flex items-center gap-2 cursor-pointer">
            <ArrowLeft className="w-4 h-4" />
            <span>Quay lại trang trước</span>
          </button>
        </div>
        <div className="grid grid-cols-10 gap-8">
          {/* Image */}
          <div className="col-span-5">
            <div
              className="aspect-square bg-cover bg-center rounded-4xl"
              style={{ backgroundImage: `url(${food.image || foodUrl})` }}
            ></div>
          </div>

          {/* Content */}
          <div className="col-span-5">
            <div className="flex flex-col gap-4 justify-between  h-full">
              <div>
                <h1 className="text-4xl font-semibold">{food.name}</h1>
                <p className="text">{food.description}</p>
              </div>

              <div className="flex flex-col gap-2">
                <span className="font-semibold text-sm text-gray-500">SIZE</span>
                <div className="flex items-center gap-2">
                  {food.food_variant
                    ?.sort((a, b) => a.variants.price_adjust - b.variants.price_adjust)
                    ?.map((variant) => (
                      <button
                        key={variant.variant_id}
                        onClick={() => setSelectedVariant(variant)}
                        className={`text-sm px-4 py-2 rounded-full border border-gray-300 cursor-pointer hover:bg-secondary hover:text-white transition-all duration-300 active:scale-95 select-none hover:scale-105 ${
                          selectedVariant?.variant_id === variant.variant_id ? "bg-secondary text-white" : ""
                        }`}
                      >
                        {variant.variants.name}
                      </button>
                    ))}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <span className="font-semibold text-sm text-gray-500">BUILD YOUR MEAL</span>
                <div className="grid grid-cols-4 items-center gap-2">
                  <div
                    className="border border-gray-300 rounded-2xl p-2 col-span-1 py-10 bg-cover bg-center"
                    style={{
                      backgroundImage: `url(https://i.pinimg.com/736x/00/56/58/00565827a20615d5d3934be98fda3f1f.jpg)`,
                    }}
                  ></div>
                  <div
                    className="border border-gray-300 rounded-2xl p-2 col-span-1 py-10 bg-cover bg-center"
                    style={{
                      backgroundImage: `url(https://i.pinimg.com/736x/00/56/58/00565827a20615d5d3934be98fda3f1f.jpg)`,
                    }}
                  ></div>
                  <div
                    className="border border-gray-300 rounded-2xl p-2 col-span-1 py-10 bg-cover bg-center"
                    style={{
                      backgroundImage: `url(https://i.pinimg.com/736x/00/56/58/00565827a20615d5d3934be98fda3f1f.jpg)`,
                    }}
                  ></div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 flex-1 justify-center">
                  <button
                    onClick={() => setQuantity((prev) => prev + 1)}
                    className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center"
                  >
                    <PlusIcon className="w-4 h-4" />
                  </button>
                  <span>{quantity}</span>
                  <button
                    onClick={() => setQuantity((prev) => prev - 1)}
                    disabled={quantity <= 1}
                    className={`w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center ${
                      quantity <= 1 ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    <MinusIcon className="w-4 h-4" />
                  </button>
                </div>

                {/* Add to order button */}
                <div className="flex-3">
                  <div className="bg-secondary rounded-full px-6 py-3 text-white flex items-center gap-2 justify-around">
                    <span>{food.price}</span>
                    <span className="border border-gray-400 h-[20px]"></span>
                    <button className="bg-secondary rounded-full text-white">Add to Order</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="text-lg font-semibold mb-4">Đề xuất món ăn cùng loại</div>
        {food?.side_category_id && <RecommendedFoods side_category_id={food.side_category_id} slug={food.slug} />}
      </div>
    </div>
  );
};

export default FoodDetailPage;
