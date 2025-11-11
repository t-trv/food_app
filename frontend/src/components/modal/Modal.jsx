import React, { useEffect } from "react";
import { X } from "lucide-react";

const Modal = ({
  isOpen,
  onClose,
  children,
  title,
  showCloseButton = true,
  closeOnOverlayClick = true,
  width = "auto",
  maxWidth = "90vw",
  maxHeight = "90vh",
  minHeight = "500px",
  className = "",
  overlayClassName = "",
  contentClassName = "",
  bodyClassName = "",
  footer,
  zIndex = 1000,
}) => {
  // Handle ESC key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen && onClose) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (closeOnOverlayClick && e.target === e.currentTarget && onClose) {
      onClose();
    }
  };

  return (
    <div
      className={`absolute inset-0 w-full h-full flex items-center justify-center bg-white/95 backdrop-blur-sm animate-fade-in ${overlayClassName}`}
      style={{ zIndex }}
      onMouseDown={handleOverlayClick}
    >
      <div
        className={`relative bg-white rounded-xl shadow-lg flex flex-col overflow-hidden animate-slide-in ${contentClassName} ${className}`}
        style={{
          width,
          maxWidth,
          maxHeight,
          minHeight,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between px-6 py-6 border-b border-gray-200 shrink-0">
            {title && <h2 className="text-secondary text-2xl font-semibold m-0 flex-1">{title}</h2>}
            {showCloseButton && (
              <button
                onClick={onClose}
                type="button"
                aria-label="Đóng"
                className="flex items-center justify-center w-8 h-8 rounded-lg border-none bg-transparent text-secondary cursor-pointer transition-all duration-200 shrink-0 hover:bg-gray-100 hover:text-primary hover:scale-105 active:scale-95"
              >
                <X size={20} />
              </button>
            )}
          </div>
        )}
        <div className={`px-6 py-6 overflow-y-auto flex-1 text-secondary custom-scrollbar ${bodyClassName}`}>
          {children}
        </div>
        {footer && (
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 shrink-0">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
