import { Product } from "@/generated/prisma"
import { httpInstance } from "@/lib/http-instance"
import { ApiRoutes } from "@/types";

export const search = async (query:string) => {
  const { data } = await httpInstance.get<Product[]>(ApiRoutes.SEARCH_PRODUCTS, {
    params: {
      query
    }
  });
  return data;
}