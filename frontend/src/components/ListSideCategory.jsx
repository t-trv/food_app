const ListSideCategory = ({ sideCategories, selectedSideCategory, setSelectedSideCategory }) => {
  return (
    <div className="flex gap-2">
      {sideCategories.map((sideCategory) => (
        <button
          key={sideCategory.id}
          className={`bg-gray-200 rounded-full px-3 py-1 min-w-10 text-xs text-center transition-all duration-300 cursor-pointer ${
            selectedSideCategory === sideCategory.id ? "bg-secondary text-white" : ""
          }`}
          onClick={() => {
            if (selectedSideCategory === sideCategory.id) {
              setSelectedSideCategory(null);
            } else {
              setSelectedSideCategory(sideCategory.id);
            }
          }}
        >
          {sideCategory.name}
        </button>
      ))}
    </div>
  );
};

export default ListSideCategory;
