import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface CartItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string | null;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearItem: () => void;
}

const useCartStore = create<CartState>()(
  devtools(persist(
    (set) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
            // 1. ดูว่ามี product ชิ้นนี้ใน Cart รึยัง -----> เช็คใน items: ["id: 1, ...", "id: 2, ..."]
          const exist = state.items.find((i) => i.id === item.id);
            
            // 2. ถ้ามี ==> add Qty + 1 
          if (exist) {
            return {
              items: state.items.map((i) =>
                i.id === item.id
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : item // item อื่นที่ id ไม่ตรงกันรักษาไว้เหมือนเดิม
              ),
            };
          }
            // 3. ถ้าไม่มี ===> add เป็น new object (item ชิ้นใหม่)
          return { items: [...state.items, item] };
        }),
      removeItem: (id) =>
        set((state) => {
          return {
            items: state.items
              .map((item) =>
                item.id === id
                  ? {
                      ...item, // ข้อมูลอื่นๆ เหมือนเดิม
                      quantity: item.quantity - 1,
                    }
                  : item
              )
              .filter((item) => item.quantity > 0), // คัดแค่ qty ที่มากกว่า 0 เท่านั้น
          };
        }),
      clearItem: () =>
        set(() => {
          return { items: [] };
        }),
    }),
    {
      name: "Cart-Storage",
    }
  ))
);

export default useCartStore;
