const Button = ({ label, onClick, disabled, icon }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-3 py-1 rounded-lg transition-all duration-300 cursor-pointer flex items-center ${
        disabled ? "opacity-50" : "bg-white text-secondary border border-secondary hover:bg-secondary hover:text-white"
      }`}
    >
      {icon && <span className="mr-1 w-4 h-4">{icon}</span>}
      <span className="text-md">{label}</span>
    </button>
  );
};

export default Button;
