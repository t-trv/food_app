import { NavLink } from "react-router-dom";

const Category = ({ list }) => {
  // List nhận: { id, title }

  return (
    <div className="flex items-center gap-2 my-4 m-w-full overflow-auto scroll-smooth no-scrollbar">
      {list.map((item) => (
        <div key={item.id} className="flex items-center gap-2">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "bg-secondary text-white text-xs font-light px-4 py-2 rounded-full hover:scale-105 transition-all duration-300 active:scale-95 cursor-pointer text-nowrap"
                : "bg-stone-100 text-secondary text-xs font-md px-4 py-2 rounded-full hover:scale-105 transition-all duration-300 active:scale-95 cursor-pointer text-nowrap"
            }
            to={`/category/${item.id}`}
          >
            {item.title}
          </NavLink>
        </div>
      ))}
    </div>
  );
};

export default Category;
