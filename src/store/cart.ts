import { getCartDetails } from "@/lib/get-cart-details";
import { apiClient } from "@/services/api-client";
import { CartState } from "@/types";
import { create } from "zustand";

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  error: false,
  loading: true,
  totalAmount: 0,
  fetchCartItems: async () => {
    try {
      set({ loading: true, error: false});
      const data = await apiClient.cartService.gerCart();
      set(getCartDetails(data));
    } catch (error) {
      console.log(error);
      set({ error: true})
    } finally {
      set({ loading: false })
    }
  },
  updateItemQuantity: async (id: number, quantity: number) => {},
  addCartItem: async (values: any) => {},
  removeCartItem: async (id: number) => {}
}))