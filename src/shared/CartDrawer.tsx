'use client';
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React, { PropsWithChildren, useEffect } from 'react'
import CartDrawerItem from './CartDrawerItem'
import { useCartStore } from '@/store/cart';
import { getCartItemDetails } from '@/lib/get-cart-item-details';
import { PizzaSize, PizzaType } from '@/lib/constants';

const CartDrawer = ({ children }:PropsWithChildren) => {
  const { totalAmount, fetchCartItems, items } = useCartStore();
  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col justify-between pb-0 bg-[#F4F1EE]">
        <SheetHeader>
          <SheetTitle>
            В корзине <span className="font-bold">{totalAmount} товара</span>
          </SheetTitle>
        </SheetHeader>
        {items.map((item) => (
          <CartDrawerItem
            key={item.id}
            id={item.id}
            imageUrl={item.imageUrl}
            details={getCartItemDetails(
              item.ingredients,
              item.pizzaType as PizzaType,
              item.pizzaSize as PizzaSize
            )}
            name={item.name}
            price={item.price}
            quantity={item.quantity}
          />
        ))}
        
        <SheetFooter className="bg-white p-8">
          <div className="w-full">
            <div className="flex mb-4">
              <span className="flex flex-1 text-lg text-neutral-500">
                Итого
                <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
              </span>
              <span className="font-bold text-lg">500 ₽</span>
            </div>
            <Link href="/checkout">
              <Button
                type="submit"
                className="w-full h-12 text-base">
                Оформить заказ
                <ArrowRight className="w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default CartDrawer