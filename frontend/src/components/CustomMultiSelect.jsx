import { useState, useRef, useEffect } from "react";

/**
 * Custom MultiSelect Component với full styling control
 * @param {Object} props
 * @param {string} props.name - Field name
 * @param {Array} props.value - Current values (array)
 * @param {Function} props.onChange - Change handler
 * @param {Array} props.options - Array of {value, label}
 * @param {string} props.placeholder - Placeholder text
 * @param {string} props.className - Additional classes
 * @param {boolean} props.hasError - Has error state
 */
const CustomMultiSelect = ({
  name,
  value = [],
  onChange,
  options = [],
  placeholder,
  className = "",
  hasError = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [showAllTags, setShowAllTags] = useState(false);
  const selectRef = useRef(null);
  const dropdownRef = useRef(null);
  const tagsContainerRef = useRef(null);

  // Ensure value is always an array
  const selectedValues = Array.isArray(value) ? value : [];

  // Get selected options
  const selectedOptions = options.filter((opt) => selectedValues.includes(opt.value));

  // Handle option toggle
  const handleOptionToggle = (optionValue) => {
    const newValues = selectedValues.includes(optionValue)
      ? selectedValues.filter((v) => v !== optionValue)
      : [...selectedValues, optionValue];

    onChange({
      target: {
        name,
        value: newValues,
      },
    });
  };

  // Handle remove tag
  const handleRemoveTag = (e, optionValue) => {
    e.stopPropagation();
    const newValues = selectedValues.filter((v) => v !== optionValue);
    onChange({
      target: {
        name,
        value: newValues,
      },
    });
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (!isOpen) {
      if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setFocusedIndex((prev) => (prev < options.length - 1 ? prev + 1 : prev));
        break;
      case "ArrowUp":
        e.preventDefault();
        setFocusedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (focusedIndex >= 0 && options[focusedIndex]) {
          handleOptionToggle(options[focusedIndex].value);
        }
        break;
      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        setFocusedIndex(-1);
        break;
      default:
        break;
    }
  };

  // Scroll focused option into view
  useEffect(() => {
    if (focusedIndex >= 0 && dropdownRef.current) {
      const focusedElement = dropdownRef.current.children[focusedIndex];
      if (focusedElement) {
        focusedElement.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
    }
  }, [focusedIndex]);

  // Check if tags container is scrollable
  const [isScrollable, setIsScrollable] = useState(false);
  useEffect(() => {
    if (tagsContainerRef.current && selectedOptions.length > 0 && !showAllTags) {
      const container = tagsContainerRef.current;
      // Use setTimeout to ensure DOM is updated
      setTimeout(() => {
        if (container) {
          setIsScrollable(container.scrollWidth > container.clientWidth);
        }
      }, 0);
    } else {
      setIsScrollable(false);
    }
  }, [selectedOptions.length, showAllTags]);

  const baseClassName = `border rounded-xl p-2 focus:outline-secondary bg-[#F7FBFF] text-sm cursor-pointer min-h-[48px] flex items-center gap-2 ${
    hasError ? "border-primary" : "border-gray-300"
  } ${className}`;

  return (
    <div ref={selectRef} className="relative">
      <div
        className={baseClassName}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-multiselectable="true"
      >
        {selectedOptions.length === 0 ? (
          <span className="text-gray-400 py-1 shrink-0">{placeholder || "Chọn các tùy chọn"}</span>
        ) : (
          <>
            <div
              ref={tagsContainerRef}
              className={`flex gap-2 w-full min-w-0 hide-scrollbar ${showAllTags ? "flex-wrap" : "overflow-x-auto"}`}
            >
              {selectedOptions.map((option) => (
                <span
                  key={option.value}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-secondary text-white rounded-lg text-xs font-medium shrink-0"
                >
                  {option.label}
                  <button
                    type="button"
                    onClick={(e) => handleRemoveTag(e, option.value)}
                    className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
                    aria-label={`Xóa ${option.label}`}
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              ))}
            </div>
            {isScrollable && !showAllTags && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowAllTags(true);
                }}
                className="shrink-0 px-2 py-1 text-xs text-secondary hover:bg-gray-200 rounded-lg transition-colors"
                aria-label="Hiển thị tất cả"
              >
                +{selectedOptions.length}
              </button>
            )}
            {showAllTags && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowAllTags(false);
                }}
                className="shrink-0 px-2 py-1 text-xs text-secondary hover:bg-gray-200 rounded-lg transition-colors"
                aria-label="Thu gọn"
              >
                Thu gọn
              </button>
            )}
          </>
        )}
        {selectedOptions.length === 0 && (
          <svg
            className={`w-5 h-5 text-gray-600 transition-transform duration-200 shrink-0 ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </div>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-xl shadow-lg max-h-60 overflow-auto"
          role="listbox"
          aria-multiselectable="true"
        >
          {options.length === 0 ? (
            <div className="px-4 py-3 text-sm text-gray-500 text-center">Không có tùy chọn</div>
          ) : (
            options.map((option, index) => {
              const isSelected = selectedValues.includes(option.value);
              const isFocused = index === focusedIndex;

              return (
                <div
                  key={option.value}
                  className={`px-4 py-3 text-sm cursor-pointer transition-colors flex items-center gap-2 ${
                    isSelected
                      ? "bg-[#F7FBFF] text-gray-900 font-medium"
                      : isFocused
                      ? "bg-[#F7FBFF] text-gray-900"
                      : "text-gray-700 hover:bg-[#F7FBFF]"
                  }`}
                  onClick={() => handleOptionToggle(option.value)}
                  onMouseEnter={() => setFocusedIndex(index)}
                  role="option"
                  aria-selected={isSelected}
                >
                  <div
                    className={`w-4 h-4 border-2 rounded flex items-center justify-center shrink-0 ${
                      isSelected ? "bg-secondary border-secondary" : "border-gray-300 bg-white"
                    }`}
                  >
                    {isSelected && (
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span>{option.label}</span>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default CustomMultiSelect;
