import { Ingredient } from "@/generated/prisma"
import { apiClient } from "@/services/api-client";
import { useEffect, useState } from "react"

const useIngredientsFilter = () => {
  const [ ingredients, setIngredients ] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchIngredients() {
      try {
        setLoading(true);
        const ingredients = await apiClient.ingredientsService.getAll();
        setIngredients(ingredients);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchIngredients();
  }, []);
   return {
    ingredients,
    loading,
  };
}

export default useIngredientsFilter;