import { getCartDetails } from "@/lib/get-cart-details";
import { apiClient } from "@/services/api-client";
import { CartState, CreateCartItemValues } from "@/types";
import { create } from "zustand";
export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  error: false,
  loading: true,
  totalAmount: 0,
  fetchCartItems: async () => {
    try {
      set({ loading: true, error: false});
      const data = await apiClient.cartService.getCart();
      set(getCartDetails(data));
    } catch (error) {
      console.log(error);
      set({ error: true})
    } finally {
      set({ loading: false })
    }
  },
  updateItemQuantity: async (id: number, quantity: number) => {
    try {
      set({ loading: true, error: false});
      const data = await apiClient.cartService.updateCartItemQuantity({
        id,
        quantity
      });
      set(getCartDetails(data));
    } catch (error) {
      console.log(error);
      set({ error: true})
    } finally {
      set({ loading: false })
    }
  },
  removeCartItem: async (id: number) => {
    try {
      set({ loading: true, error: false});
      const data = await apiClient.cartService.removeCartItem(id);
      set(getCartDetails(data));
    } catch (error) {
      console.log(error);
      set({ error: true})
    } finally {
      set({ loading: false })
    }
  },
  addCartItem: async (values: CreateCartItemValues) => {
    try {
      set({ loading: true, error: false});
      const data = await apiClient.cartService.addCartItem(values);
      set(getCartDetails(data));
    } catch (error) {
      console.log(error);
      set({ error: true})
    } finally {
      set({ loading: false })
    }
  }
}))