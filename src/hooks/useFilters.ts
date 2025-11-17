import { Filters, PriceRange } from "@/types";
import { useMemo, useState } from "react";
import { useSet } from "react-use";

interface ReturnProps extends Filters {
  setPrices: (name: keyof PriceRange, value: number) => void;
  setPizzaTypes: (value: string) => void;
  setSizes: (value: string) => void;
  setSelectedIngredients: (value: string) => void;
}
export function useFilters():ReturnProps {
  const [selectedIngredients, { toggle: toggleIngredients }] = useSet(new Set<string>());
  const [sizes, { toggle: toggleSizes }] = useSet(new Set<string>(),);
  const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(new Set<string>());
   const [prices, setPrices] = useState<PriceRange>({
    from: 0,
    to: 1000,
  });
  const updatePrice = (name: keyof PriceRange, value: number) => {
    setPrices((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return {
      sizes,
      pizzaTypes,
      selectedIngredients,
      prices,
      setPrices: updatePrice,
      setPizzaTypes: togglePizzaTypes,
      setSizes: toggleSizes,
      setSelectedIngredients: toggleIngredients,
    }
}