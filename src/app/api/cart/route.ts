import { prisma } from "@/lib/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
  try {
    const cartToken = req.cookies.get('cartToken')?.value || '11111'; // unauthorized user token for cart
    if (!cartToken) {
      return NextResponse.json({ totalAmount: 0, items: []})
    }
    const userCart = await prisma.cart.findFirst({
      where: {
        token: cartToken
      },
      include: {
        items: {
          orderBy: {
            createdAt: 'desc'
          },
          include: {
            productItem: {
              include: {
                product: true
              }
            },
            ingredients: true
          }
        }
      }
    });
    return NextResponse.json(userCart);
  } catch (error) {
    console.log(error);
  }
}