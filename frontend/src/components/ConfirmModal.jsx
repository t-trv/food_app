import React from "react";

const ConfirmModal = ({ isOpen, onClose, title, desc, onConfirm }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/10 bg-opacity-30 backdrop-blur-sm"
        onClick={handleOverlayClick}
      />
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md mx-4 p-6 animate-slide-in">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            {title || "Xác nhận"}
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            {desc || "Bạn có chắc chắn muốn thực hiện hành động này?"}
          </p>
        </div>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-sm font-medium text-gray-600 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 hover:border-gray-400 active:scale-95 transition-all duration-200 cursor-pointer"
          >
            Hủy
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2 text-sm font-medium text-white bg-red-500 border border-red-500 rounded-lg hover:bg-red-600 hover:border-red-600 active:scale-95 transition-all duration-200 cursor-pointer"
          >
            Đồng ý
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
