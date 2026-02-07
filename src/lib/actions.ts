'use server';

import { OrderStatus, Prisma } from "@/generated/prisma";
import { prisma } from "./prisma-client";
import { CheckoutFormValues } from "./schemas";
import { cookies } from "next/headers";
import { sendEmail } from "./sendEmail";
import PayOrderTemplate from "@/shared/email-templates/PayOrderTemplate";
import { createPayment } from "./create-payment";
import { isAxiosError } from "axios";
import { getUserSession } from "./get-user-session";
import { hashSync } from "bcrypt";

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
    // Clear cart
    await prisma.cart.update({
      where: {
        id: userCart.id
      },
      data: {
        totalAmount: 0
      }
    });
    await prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id
      }
    });
    const paymentData = await createPayment({
      amount: order.totalAmount,
      orderId: order.id,
      description: 'Оплата заказа №' + order.id,
    });
    if (!paymentData) {
      throw new Error(
        'Payment failed',
      );
    }
    await prisma.order.update({
      where: {
        id: order.id
      },
      data: {
        paymentId: paymentData.id,
      }
    });
    const paymentUrl = paymentData.confirmation.confirmation_url;
    //Send email
    await sendEmail(
      data.email,
      `'NiNo Pizza / Оплатите заказ №${order.id}`,
      PayOrderTemplate({
        orderId: order.id,
        totalAmount: order.totalAmount,
        paymentUrl,
      }),
    );
    return paymentUrl;
  } catch (error) {
    if(isAxiosError(error)){
      return console.log(error.response);
    }
    console.log(error);
  }
}
export const updateUserAction = async (body: Prisma.UserUpdateInput) => {
  try {
    const currentUser = await getUserSession();
    if (!currentUser) {
      throw new Error(
        'Пользователь не найден',
      );
    };
    const findUser = await prisma.user.findFirst({
      where: {
        id: Number(currentUser.id),
      },
    });
    await prisma.user.update({
      where: {
        id: Number(currentUser.id)
      },
      data: {
        fullName: body.fullName,
        email: body.email,
        password: body.password ? hashSync(body.password as string, 10): findUser?.password,
      }
    });
  } catch (error) {
    console.log('Error [UPDATE_USER]', error);
    throw error;
  }
};
export const registerUserAction = async (body: Prisma.UserCreateInput) => {
  try {
    const isAlreadyExist = await prisma.user.findFirst({
      where: {
        email: body.email,
      }
    });
    if(isAlreadyExist) {
      if(isAlreadyExist.verified) {
        throw new Error(
          'Необходимо подтвердить почту',
        );
      }
      throw new Error(
        'Пользователь с таким email уже существует',
      );
    }
  } catch (error) {
    console.log('Error [CREATE_USER]', error);
    throw error;
  }
};