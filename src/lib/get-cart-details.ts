import { CartDto, CartStateItem } from "@/types";
import { calcCartItemTotalPrice } from "./calc-cart-item-total-price";
interface ReturnProps {
  items: CartStateItem[];
  totalAmount: number;
}
export const getCartDetails = (data: CartDto):ReturnProps => {
  const items = data.items.map((item) => ({
    id: item.id,
    quantity: item.quantity,
    name: item.productItem.product.name,
    imageUrl: item.productItem.product.imageUrl,
    price: calcCartItemTotalPrice(item),
    pizzaSize: item.productItem.size,
    pizzaType: item.productItem.pizzaType,
    disabled: false,
    ingredients: item.ingredients.map((ingredient) => ({
      name: ingredient.name,
      price: ingredient.price,
    })),
  })) as CartStateItem[];
  return {
    items,
    totalAmount: data.totalAmount
  };
};