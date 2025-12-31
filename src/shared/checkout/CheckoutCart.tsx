import React from 'react'
import { WhiteBlock } from '../WhiteBlock'
import { CartStateItem, PropsWithClass } from '@/types';
import CheckoutItem from './CheckoutItem';
import { PizzaSize, PizzaType } from '@/lib/constants';
import { getCartItemDetails } from '@/lib/get-cart-item-details';

interface Props extends PropsWithClass {
  items: CartStateItem[];
  onClickCountButton: (id: number, quantity: number, type: 'plus' | 'minus') => void;
  removeCartItem: (id: number) => void;
  loading?: boolean;

}
const CheckoutCart = ({ items, className, removeCartItem, onClickCountButton }: Props) => {
  return (
    <WhiteBlock title="1. Корзина" className={className}>
      <div className="flex flex-col gap-5">
        {items.map((item) => (
          <CheckoutItem
            key={item.id}
            id={item.id}
            imageUrl={item.imageUrl}
            details={getCartItemDetails(
              item.ingredients,
              item.pizzaType as PizzaType,
              item.pizzaSize as PizzaSize,
            )}
            name={item.name}
            price={item.price}
            quantity={item.quantity}
            disabled={item.disabled}
            onClickCountButton={(type) => onClickCountButton(item.id, item.quantity, type)}
            onClickRemove={() => removeCartItem(item.id)}       
          />
        ))}
      </div>
    </WhiteBlock>
  )
}

export default CheckoutCart