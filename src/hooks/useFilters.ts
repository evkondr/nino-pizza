import { Filters, PriceRange } from "@/types";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { useSet } from "react-use";

interface ReturnProps extends Filters {
  setPrices: (name: keyof PriceRange, value: number) => void;
  setPizzaTypes: (value: string) => void;
  setSizes: (value: string) => void;
  setSelectedIngredients: (value: string) => void;
}
export function useFilters():ReturnProps {
  const searchParams = useSearchParams();
  const [selectedIngredients, { toggle: toggleIngredients }] = useSet(
    new Set<string>(searchParams.get('ingredients')?.split(',') || new Array<string>())
  );
  const [sizes, { toggle: toggleSizes }] = useSet(
    new Set<string>(searchParams.get('sizes')?.split(',') || new Array<string>())
  );
  const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(
    new Set<string>(searchParams.get('pizzaTypes')?.split(',') || new Array<string>())
  );

   const [prices, setPrices] = useState<PriceRange>({
    from:  Number(searchParams.get('priceFrom')) || undefined,
    to: Number(searchParams.get('priceTo')) || undefined,
  });
  
  const updatePrice = (name: keyof PriceRange, value: number) => {
    setPrices((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  return useMemo(() => (
    {
      sizes,
      pizzaTypes,
      selectedIngredients,
      prices,
      setPrices: updatePrice,
      setPizzaTypes: togglePizzaTypes,
      setSizes: toggleSizes,
      setSelectedIngredients: toggleIngredients,
    }
  ), [pizzaTypes, prices, selectedIngredients, sizes, toggleIngredients, togglePizzaTypes, toggleSizes]); 
}