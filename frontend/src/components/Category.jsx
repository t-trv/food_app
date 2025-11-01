import { NavLink, useSearchParams } from "react-router-dom";

const Category = ({ list }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = searchParams.get("category") || list[0]?.id;

  return (
    <div className="flex items-center gap-2 py-2 px-1 m-w-full overflow-auto scroll-smooth no-scrollbar">
      {list.map((item) => {
        const isActive = currentCategory === item.id;

        return (
          <div key={item.id} className="flex items-center gap-2">
            <NavLink
              className={
                isActive
                  ? "bg-secondary text-white text-xs font-light px-4 py-2 rounded-full hover:scale-105 transition-all duration-300 active:scale-95 cursor-pointer text-nowrap"
                  : "bg-stone-100 text-secondary text-xs font-md px-4 py-2 rounded-full hover:scale-105 transition-all duration-300 active:scale-95 cursor-pointer text-nowrap"
              }
              to={`/?category=${item.id}`}
            >
              {item.title}
            </NavLink>
          </div>
        );
      })}
    </div>
  );
};

export default Category;
