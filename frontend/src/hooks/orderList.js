import toast from "react-hot-toast";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useOrderList = create(
  persist(
    (set) => ({
      orderList: [],
      addToOrderList: (item) => {
        set((state) => {
          const isDuplicate = state.orderList.find((i) => i.id === item.id && i.variant === item.variant);
          if (isDuplicate) {
            return {
              orderList: state.orderList.map((i) =>
                i.id === item.id && i.variant === item.variant ? { ...i, quantity: i.quantity + item.quantity } : i
              ),
            };
          }

          toast.success("Đặt món thành công");
          return { orderList: [...state.orderList, { ...item }] };
        });
      },
      removeFromOrderList: (item) => {
        set((state) => {
          return { orderList: state.orderList.filter((i) => i !== item) };
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
