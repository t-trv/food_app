import toast from "react-hot-toast";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useOrderList = create(
  persist(
    (set) => ({
      orderList: [],
      addToOrderList: (item) => {
        set((state) => {
          const isDuplicate = state.orderList.some((i) => i.id === item.id);
          if (isDuplicate) {
            toast.error("Món này đã được thêm vào danh sách đặt món");
            return state;
          }
          toast.success("Đặt món thành công");
          return { orderList: [...state.orderList, { ...item, quantity: 1 }] };
        });
      },
      removeFromOrderList: (id) => {
        set((state) => {
          toast.success("Xóa món thành công");
          return { orderList: state.orderList.filter((item) => item.id !== id) };
        });
      },
      clearOrderList: () => {
        set({ orderList: [] });
      },
    }),
    {
      name: "orderListStorage",
    }
  )
);

export default useOrderList;
