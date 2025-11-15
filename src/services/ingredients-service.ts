import { Ingredient } from "@/generated/prisma";
import { httpInstance } from "@/lib/http-instance"
import { ApiRoutes } from "@/types"

export const getAll = async ():Promise<Ingredient[]> => {
  const { data } = await httpInstance.get<Ingredient[]>(ApiRoutes.INGREDIENTS);
  return data;
}