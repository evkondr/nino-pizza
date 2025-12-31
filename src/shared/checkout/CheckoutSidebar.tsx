import React from 'react'
import { WhiteBlock } from '../WhiteBlock';
import { PropsWithClass } from '@/types';
import { cn } from '@/lib/utils';
import CheckoutItemDetails from './CheckoutItemDetails';
import { ArrowRight, Package, Percent, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';

const VAT = 15;
const DELIVERY_PRICE = 250;

interface Props extends PropsWithClass{
  totalAmount: number;
  loading?: boolean;
}
const CheckoutSidebar = ({ className, totalAmount }:Props) => {
  const vatPrice = (totalAmount * VAT) / 100;
  const totalPrice = totalAmount + DELIVERY_PRICE + vatPrice;
  return (
    <WhiteBlock className={cn('p-6 sticky top-4', className)}>
      <div className="flex flex-col gap-1">
        <span className="text-xl">Итого:</span>
        <span className="h-11 text-[34px] font-extrabold">{totalPrice} ₽</span>
      </div>
      <CheckoutItemDetails value={totalAmount}>
        <div className="flex items-center">
          <Package size={18} className="mr-2 text-gray-400" />
          Стоимость корзины:
        </div>
      </CheckoutItemDetails>
      <CheckoutItemDetails value={vatPrice}>
        <div className="flex items-center">
          <Percent size={18} className="mr-2 text-gray-400" />
          Налоги:
        </div>
      </CheckoutItemDetails>
      <CheckoutItemDetails value={DELIVERY_PRICE}>
        <div className="flex items-center">
          <Truck size={18} className="mr-2 text-gray-400" />
          Доставка:
        </div>
      </CheckoutItemDetails>
      <Button
        // loading={loading}
        type="submit"
        className="w-full h-14 rounded-2xl mt-6 text-base font-bold">
        Перейти к оплате
        <ArrowRight className="w-5 ml-2" />
      </Button>
    </WhiteBlock>
  )
}

export default CheckoutSidebar