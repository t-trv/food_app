import { UserIcon, Sandwich, ShoppingCartIcon } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(null);

  const navItems = [
    {
      name: "Người dùng",
      path: "/admin/dashboard/users",
      icon: <UserIcon />,
    },
    {
      name: "Món ăn",
      path: "/admin/dashboard/foods",
      icon: <Sandwich />,
    },
  ];

  return (
    <div className="w-full h-full bg-white rounded-xl p-4">
      <div
        className="cursor-pointer"
        onClick={() => {
          setIsActive(null);
          navigate("/admin/dashboard");
        }}
      >
        <h1 className="text-3xl font-bold text-primary brand-title-font">
          QuadBite
        </h1>
      </div>

      <div className="flex flex-col gap-2 mt-8">
        {navItems.map((item) => (
          <NavLink
            to={item.path}
            key={item.path}
            className={`flex items-center gap-2 px-4 py-2 transition-all duration-300 select-none rounded-2xl ${
              isActive === item.path
                ? "bg-secondary text-white"
                : "hover:bg-gray-100"
            }`}
            onClick={() => setIsActive(item.path)}
          >
            {item.icon}
            <span className="text-md">{item.name}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default AdminSidebar;
