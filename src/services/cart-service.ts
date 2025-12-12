import { httpInstance } from "@/lib/http-instance";
import { ApiRoutes, CartDto } from "@/types";

export const gerCart = async ():Promise<CartDto > => {
  const { data } = await httpInstance.get<CartDto>(ApiRoutes.CART)
  return data;
}