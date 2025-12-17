import { httpInstance } from "@/lib/http-instance";
import { ApiRoutes, CartDto, CreateCartItemValues } from "@/types";

type UpdateCartItemDto = {
  id: number
  quantity: number
}
export const getCart = async ():Promise<CartDto > => {
  const { data } = await httpInstance.get<CartDto>(ApiRoutes.CART)
  return data;
}

export const updateCartItemQuantity = async (dto:UpdateCartItemDto):Promise<CartDto > => {
  const { data } = await httpInstance.patch<CartDto>(`${ApiRoutes.CART}/${dto.id}`, { quantity: dto.quantity })
  return data;
}

export const removeCartItem = async (id:number):Promise<CartDto> => {
  const { data } = await httpInstance.delete<CartDto>(`${ApiRoutes.CART}/${id}`)
  return data;
}

export const addCartItem = async (value:CreateCartItemValues):Promise<CartDto> => {
  const { data } = await httpInstance.post<CartDto>(`${ApiRoutes.CART}`, value)
  return data;
}