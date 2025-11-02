const Category = ({ list, activeCategory, setActiveCategory }) => {
  return (
    <div className="flex items-center gap-2 py-2 px-1 m-w-full overflow-auto scroll-smooth no-scrollbar">
      {list.map((item) => (
        <button
          onClick={() => {
            if (item.id === activeCategory) {
              setActiveCategory(null);
            } else {
              setActiveCategory(item.id);
            }
          }}
          key={item.id}
          className={`flex items-center gap-2 text-xs font-md px-4 py-2 rounded-full hover:scale-105 transition-all duration-300 active:scale-95 cursor-pointer text-nowrap ${
            item.id === activeCategory
              ? "bg-secondary text-white"
              : "bg-stone-100 text-secondary"
          }`}
        >
          <span>{item.name}</span>
        </button>
      ))}
    </div>
  );
};

export default Category;
