import { Ingredient, ProductItem } from "@/generated/prisma";
export const calcCartItemTotalPrice = (item: { ingredients:Ingredient[], productItem:ProductItem, quantity: number}): number => {
  const ingredientsPrice = item.ingredients.reduce((acc, ingredient) => acc + ingredient.price, 0);

  return (ingredientsPrice + item.productItem.price) * item.quantity;
};