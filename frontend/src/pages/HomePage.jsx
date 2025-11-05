import { PhoneCall, PlayIcon, StarIcon, TruckIcon } from "lucide-react";
import { homeCustomerImage1, homeCustomerImage2, homeCustomerImage3 } from "../assets/homeCustomerImages";
import { clockIcon, homeBackgroundImage, pizzaBBQImage, supporterImage } from "../assets/homeBackgroundImages";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-2 lg:grid-cols-10 gap-4 p-4 h-full">
      <div className="col-span-4 flex flex-col gap-8 justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-[#FEE9DE] text-secondary px-4 py-2 rounded-full w-fit cursor-default">
            <span className="text-xs">Miễn phí giao hàng</span>
          </div>
          <div className="flex items-center gap-1 bg-[#FEE9DE] text-secondary px-4 py-2 rounded-full w-fit cursor-default">
            <span className="text-xs">Nhận món trong 5 phút</span>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-6xl font-bold leading-tight w-[90%]">
            Nhận những Ưu Đãi lớn đến từ <span className="brand-title-font text-primary text-7xl">QuadBite</span>
          </h1>
          <p className="text-lg w-[90%]">
            Công việc của chúng tôi là lấp đầy khoảng trống trong lòng bạn với những món ăn ngon và chất lượng
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                navigate("/main-food");
              }}
              className="w-fit bg-primary text-white px-6 py-3 rounded-full text-sm font-semibold cursor-pointer hover:scale-105 transition-all duration-300 active:scale-95 select-none"
            >
              Trải nghiệm ngay
            </button>
            <button className="w-fit bg-transparent text-secondary px-6 py-3 rounded-full text-sm font-semibold flex items-center gap-2 cursor-pointer hover:scale-105 transition-all duration-300 active:scale-95 select-none">
              <span className="bg-amber-400 text-white p-3 rounded-full">
                <PlayIcon className="w-4 h-4" />
              </span>
              <span>Xem video</span>
            </button>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative w-20 h-10">
            <img src={homeCustomerImage1} alt="" className="w-10 h-10 rounded-full absolute top-0 left-0" />
            <img src={homeCustomerImage2} alt="" className="w-10 h-10 rounded-full absolute top-0 left-4" />
            <img src={homeCustomerImage3} alt="" className="w-10 h-10 rounded-full absolute top-0 left-8" />
          </div>

          <div className="text-sm">
            <h2 className="font-semibold">Khách hàng của chúng tôi</h2>
            <div className="flex items-center gap-2">
              <StarIcon className="w-4 h-4 text-yellow-500" />
              <span>4.8</span>
              <span className="text-gray-500">{"(12.5k đánh giá)"}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-6 h-full relative">
        <div
          className="h-full "
          style={{
            backgroundImage: `url(${homeBackgroundImage})`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div>
            <img src={clockIcon} alt="" className="w-20 h-20 absolute top-10 left-10" />
          </div>
          <div className="flex items-center gap-3 bg-white p-4 rounded-full w-fit shadow-md absolute top-2/3 left-0 ">
            <img src={supporterImage} alt="" className="w-10 h-10 rounded-full" />
            <div className="text-sm">
              <h3 className="font-semibold">Nguyen Tat Dat</h3>
              <p className="text-gray-500">Supporter | Co-founder</p>
            </div>
            <button className="bg-primary text-white px-4 py-2 rounded-full">
              <PhoneCall className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-center gap-2 bg-white p-4 rounded-xl w-fit shadow-md absolute top-1/3 right-10 ">
            <img src={pizzaBBQImage} alt="" className="w-16 h-16" />
            <div className="text-sm">
              <h3 className="font-semibold">Pizza BBQ</h3>
              <p className="text-gray-500">Chỉ 27.500 đồng</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
