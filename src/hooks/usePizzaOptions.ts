import { ProductItem } from "@/generated/prisma";
import { PizzaSize, PizzaType } from "@/lib/constants";
import { getAvailablePizzaSizes } from "@/lib/get-available-pizza-sizes";
import { useEffect, useState } from "react";
import { useSet } from "react-use";

export const usePizzaOptions = (items: ProductItem[]) => {
  const [size, setSize] = useState<PizzaSize>(20);
  const [type, setType] = useState<PizzaType>(1);
  const [selectedIngredients, { toggle: addIngredient }] = useSet(new Set<number>([]));
  const availableSizes = getAvailablePizzaSizes(type, items);
  const currentItemId = items.find((item) => item.pizzaType === type && item.size === size)?.id;
  useEffect(() => {
    const isAvailableSize = availableSizes?.find(
      (item) => Number(item.value) === size && !item.disabled,
    );
    const availableSize = availableSizes?.find((item) => !item.disabled);
    if (!isAvailableSize && availableSize) {
      Promise.resolve().then(() => {
          setSize(Number(availableSize.value) as PizzaSize);
        });
      
    }
  }, [availableSizes, size, type]);
  return {
    size,
    type,
    selectedIngredients,
    availableSizes,
    currentItemId,
    setSize,
    setType,
    addIngredient,
  };
}