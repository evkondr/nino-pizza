'use server'

import { OrderStatus } from "@/generated/prisma";
import { prisma } from "./prisma-client";
import { CheckoutFormValues } from "./schemas";
import { cookies } from "next/headers";
import { sendEmail } from "./sendEmail";
import PayOrderTemplate from "@/shared/email-templates/PayOrderTemplate";

export async function createOrder(data: CheckoutFormValues) {
  try {
    const cookieStore = cookies();
    const cartToken = (await cookieStore).get('cartToken')?.value;
    if (!cartToken) {
      throw new Error('Cart token not found');
    };
    const userCart = await prisma.cart.findFirst({
      where: {
        token: cartToken
      },
      include: {
        user: true,
        items: {
          include: {
            ingredients: true,
            productItem: {
              include: {
                product: true
              }
            }
          }
        }
      }
    });
    if (!userCart) {
      throw new Error('Cart not found');
    }
    if (userCart.items.length == 0) {
       throw new Error('Cart is empty');
    }
    //Create the order
    const order = await prisma.order.create({
      data: {
        token: cartToken,
        fullName: data.firstName + ' ' + data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.comment,
        totalAmount: userCart.totalAmount,
        status: OrderStatus.PENDING,
        items: JSON.stringify(userCart.items),
      },
    });
    //Clear cart
    // await prisma.cart.update({
    //   where: {
    //     id: userCart.id
    //   },
    //   data: {
    //     totalAmount: 0
    //   }
    // });
    // await prisma.cartItem.deleteMany({
    //   where: {
    //     cartId: userCart.id
    //   }
    // });
    const paymentUrl = 'https://ya.ru';
    //Send email
    await sendEmail(
      data.email,
      `'Next Pizza / Оплатите заказ №${order.id}`,
      PayOrderTemplate({
        orderId: order.id,
        totalAmount: order.totalAmount,
        paymentUrl,
      }),
    );
    return paymentUrl;
  } catch (error) {
    console.log(error)
  }
}