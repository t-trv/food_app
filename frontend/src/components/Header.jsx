import { NavLink } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { LayoutDashboardIcon, SearchIcon, ShoppingCartIcon } from "lucide-react";
import { avtDefault } from "../assets/avt";
import { useNavigate } from "react-router-dom";
import { useMainCategoryContext } from "../context/MainCategoryContext";
import isAdmin from "../libs/isAdmin";

const Header = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuthContext();
  const { mainCategories } = useMainCategoryContext();

  const headerItems = mainCategories?.map((category) => ({
    id: category.id,
    title: category.name,
    path: `${category.path}`,
  }));

  return (
    <div className="w-full bg-white py-2 px-4 rounded-full flex justify-between items-center">
      {/* Logo or brand name */}
      <div onClick={() => navigate("/")} className="cursor-pointer">
        <h1 className="text-3xl font-bold text-primary ml-2 brand-title-font">QuadBite</h1>
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

          {/* Dashboard button */}
          {isAdmin(currentUser) && (
            <button
              className="flex items-center justify-center gap-2 bg-secondary text-white px-4 py-2 rounded-full hover:scale-105 transition-all duration-300 active:scale-95 cursor-pointer"
              onClick={() => navigate("/admin/dashboard")}
            >
              <LayoutDashboardIcon className="w-4 h-4" onClick={() => navigate("/admin/dashboard")} />
            </button>
          )}

          {/* User button */}
          <button
            onClick={() => navigate("/update-profile")}
            className="rounded-full border border-secondary hover:scale-105 transition-all duration-300 active:scale-95 cursor-pointer"
          >
            <img src={currentUser.avatar || avtDefault} alt="avatar" className="w-8 h-8 rounded-full" />
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
