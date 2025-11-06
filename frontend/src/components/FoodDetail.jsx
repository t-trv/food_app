import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeftIcon } from "lucide-react";

import Loading from "./Loading";
import VariantList from "./VariantList";
import useOrderList from "../hooks/orderList";

import apiRequest from "../libs/apiRequest";
import { formatCurrency } from "../libs/formatCurrency";

const FoodDetail = () => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState("medium");

  const { addToOrderList } = useOrderList();

  const { slug, mainCategory } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["food-detail", slug],
    queryFn: async () => {
      const res = await apiRequest.get(`/foods/slug/${slug}`);
      return res.data.data;
    },
    enabled: !!slug,
    staleTime: 1000 * 60 * 60 * 1,
  });

  if (isLoading || !data || !slug || !mainCategory) return <Loading />;

  return (
    <div className="flex flex-col justify-between h-full">
      {/* Content wrapper */}
      <div>
        {/* Back button */}
        <div className="mb-4">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-900 border-2 border-gray-700 rounded-3xl px-2 py-1 flex items-center gap-2 text-sm hover:bg-gray-100 transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Quay trở lại bên em
          </button>
        </div>

        {/* Food detail */}
        <div className="grid grid-cols-12">
          <div className="col-span-5 p-4">
            <img src={data.image} alt={data.name} className="w-full h-full object-cover rounded-3xl aspect-square" />
          </div>
          <div className="col-span-7 p-4 flex flex-col justify-between">
            <div className="mb-4">
              <h1 className="text-4xl font-bold food-name-font">
                {data.name} <span className="text-sm text-gray-500">({data.preparation_time} phút chế biến)</span>
              </h1>
              <p className="text-gray-500 text-justify">
                {data.description.length > 1500 ? data.description.slice(0, 150) + "..." : data.description}
              </p>
            </div>

            <div className="mb-4">
              <span className="text-sm font-semibold text-gray-500">KÍCH CỠ</span>
              <VariantList
                variants={data.food_variant}
                selectedVariant={selectedVariant}
                setSelectedVariant={setSelectedVariant}
              />
            </div>

            <div>
              <span className="text-sm font-semibold text-gray-500">NGUYÊN LIỆU</span>
              <VariantList variants={data.food_variant} />
            </div>

            {/* Quantity and Add to orderlist */}
            <div className="mb-4 grid grid-cols-12 gap-4">
              {/* Quantity */}
              <div className="col-span-4 flex items-center gap-3">
                <button
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="w-8 h-8 rounded-full bg-gray-300 text-secondary  flex items-center justify-center hover:scale-105 transition-all duration-300 active:scale-95 cursor-pointer select-none"
                >
                  +
                </button>
                <span className="text-lg font-md">{quantity}</span>
                <button
                  onClick={() => setQuantity((prev) => prev - 1)}
                  className={`w-8 h-8 rounded-full bg-gray-300 text-secondary  flex items-center justify-center hover:scale-105 transition-all duration-300 active:scale-95 cursor-pointer select-none ${
                    quantity <= 1 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={quantity <= 1}
                >
                  -
                </button>
              </div>

              {/* Add to orderlist */}
              <div className="col-span-8">
                <button
                  onClick={() => {
                    setQuantity(1);
                    addToOrderList({
                      id: data.id,
                      name: data.name,
                      image: data.image,
                      price: data.price,
                      quantity: quantity,
                      variant: selectedVariant,
                      total_price: data.price * quantity,
                    });
                  }}
                  className="w-full bg-secondary text-white px-4 py-2 rounded-full flex items-center justify-around cursor-pointer hover:scale-105 transition-all duration-300 active:scale-95"
                >
                  <span>{formatCurrency(data.price * quantity)}</span>
                  <span className="border-l h-4 border-white"></span>
                  <span className="text-white">Thêm vào giỏ hàng</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended foods */}
      <div className="mb-4">
        <h2 className="text-lgxl font-bold">Món ăn được gợi ý</h2>
        <p>
          Những món ăn được gợi ý sẽ được hiển thị ở đây và còn nhiều tính năng ở trang này. Tuy nhiên dev khá lười nên
          phải chịu
        </p>
      </div>
    </div>
  );
};

export default FoodDetail;
