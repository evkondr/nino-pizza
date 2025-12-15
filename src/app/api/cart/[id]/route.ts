import { prisma } from "@/lib/prisma-client";
import { updateCartTotalAmount } from "@/lib/update-cart-total-amount";
import { NextRequest, NextResponse } from "next/server";
interface Params {
  params: Promise<{ id: string }>
}
export async function PATCH(req:NextRequest, { params }:Params) {
  try {
    const { id } = await params
    //Getting data from request body
    const data = (await req.json()) as { quantity: number}
    //Getting cart token from cookie
    const cartToken = req.cookies.get('cartToken')?.value || '11111';
    if (!cartToken) {
      return NextResponse.json({ error: 'Токен не найден'}, { status: 403})
    };
    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id: Number(id),
      },
    });
    if (!cartItem) {
      return NextResponse.json({ error: 'Продукт в корзине не найден' }, {status: 404});
    }
    await prisma.cartItem.update({
      where: {
        id: Number(id),
      },
      data: {
        quantity: data.quantity
      }
    })
    const updatedUserCart = await updateCartTotalAmount(cartToken);

    return NextResponse.json(updatedUserCart);
  } catch (error) {
    console.log('[CART_PATCH] Server error', error);
    return NextResponse.json({ message: 'Не удалось обновить корзину ' }, { status: 500 });
  }
} 