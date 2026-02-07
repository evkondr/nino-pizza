import { Filters } from "@/types";
import { useRouter } from "next/navigation";
import qs from "qs";
import { useRef, useEffect } from "react";

const useFilterQuery = (filters: Filters) => {
  const isMounted = useRef(false);
  const router = useRouter();

  useEffect(() => {
    if(isMounted.current) {
      const params = {
        ...filters.prices,
        pizzaTypes: Array.from(filters.pizzaTypes),
        sizes: Array.from(filters.sizes),
        ingredients: Array.from(filters.selectedIngredients),
      };
      const query = qs.stringify(params, {
        arrayFormat: 'comma',
      });
      router.push(`?${query}`, {
        scroll: false,
      });
    }
    isMounted.current = true;
  }, [filters, router]);
};
export default useFilterQuery;