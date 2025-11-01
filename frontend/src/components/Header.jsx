import { NavLink } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { SearchIcon, ShoppingCartIcon } from "lucide-react";
import { avtDefault } from "../assets/avt";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { currentUser } = useAuthContext();
  const navigate = useNavigate();

  const headerItems = [
    {
      id: "main-food",
      title: "Món ăn chính",
      path: "/",
    },
    {
      id: "side-food",
      title: "Tráng miệng",
      path: "/side-food",
    },
    {
      id: "drink",
      title: "Đồ uống",
      path: "/drink",
    },
  ];

  return (
    <div className="w-full bg-white py-2 px-4 rounded-full flex justify-between items-center">
      {/* Logo or brand name */}
      <div onClick={() => navigate("/")} className="cursor-pointer">
        <h1 className="text-xl font-bold text-primary ml-2">QuadBite</h1>
      </div>

      {/* Header items */}
      <div className="flex items-center gap-8">
        {headerItems.map((item) => (
          <NavLink
            key={item.id}
            className={({ isActive }) =>
              isActive
                ? "text-primary cursor-default text-sm"
                : "text-secondary text-sm hover:text-primary/80 hover:scale-105 transition-all duration-300 active:scale-95"
            }
            to={item.path}
          >
            <span>{item.title}</span>
          </NavLink>
        ))}
      </div>

      {/* If user is logged in, show search and cart button */}
      {/* If user is not logged in, show login and register button */}
      {currentUser ? (
        <div className="flex items-center gap-2">
          {/* Search button */}
          <button className="p-2 rounded-full cursor-pointer">
            <SearchIcon className="w-4 h-4" />
          </button>

          {/* Cart button */}
          <div>
            <button className="flex items-center justify-center gap-2 bg-primary text-white px-4 py-2 rounded-full hover:scale-105 transition-all duration-300 active:scale-95 cursor-pointer">
              <ShoppingCartIcon className="w-4 h-4" />
              <span className="text-sm font-medium">Giỏ hàng</span>
            </button>
          </div>

          {/* User button */}
          <button
            onClick={() => navigate("/update-profile")}
            className="rounded-full border-1 border-secondary hover:scale-105 transition-all duration-300 active:scale-95 cursor-pointer"
          >
            <img
              src={currentUser.avatar || avtDefault}
              alt="avatar"
              className="w-8 h-8 rounded-full"
            />
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <NavLink
            to="/login"
            className="flex items-center justify-center gap-2 bg-transparent text-secondary hover:text-primary/80 hover:scale-105 transition-all duration-300 active:scale-95 cursor-pointer text-sm"
          >
            Login
          </NavLink>
          <NavLink
            to="/register"
            className="flex items-center justify-center gap-2 bg-primary text-white px-3 py-1 rounded-full hover:scale-105 transition-all duration-300 active:scale-95 cursor-pointer text-sm"
          >
            Register
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Header;
