const ButtonFilled = ({ label, onClick, disabled, icon }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-1 rounded-lg transition-all duration-300 cursor-pointer ${
        disabled
          ? "opacity-50"
          : "bg-secondary border border-secondary text-white hover:bg-secondary/80 hover:text-white"
      }`}
    >
      {icon && <span className="mr-2 w-4 h-4">{icon}</span>}
      <span className="text-md">{label}</span>
    </button>
  );
};

export default ButtonFilled;
