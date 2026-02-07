import { cn } from '@/lib/utils';
import { CartItemProps, PropsWithClass } from '@/types';
import { X } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { CountButton } from '../CountButton';
interface Props extends CartItemProps, PropsWithClass {
  onClickCountButton?: (type: 'plus' | 'minus') => void;
  onClickRemove?: () => void;
}
const CheckoutItem = ({
  name,
  price,
  imageUrl,
  quantity,
  details,
  className,
  disabled,
  onClickCountButton,
  onClickRemove,
}:Props) => {
  return (
    <div
      className={cn(
        'flex items-center justify-between',
        {
          'opacity-50 pointer-events-none': disabled,
        },
        className,
      )}>
        <div className="flex items-center gap-5 flex-1">
          <Image width={60} height={60} className="w-[60px] h-[60px]" src={imageUrl} alt={name} />
          <div>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold flex-1 leading-6">{name}</h2>
          </div>
          {details && <p className="text-xs text-gray-400 w-[90%]">{details}</p>}
        </div>
        </div>
        <h2 className="font-bold">{price} ₽</h2>
        <div className="flex items-center gap-5 ml-20">
          <CountButton onClick={onClickCountButton} value={quantity} />
          <button type="button" onClick={onClickRemove}>
            <X className="text-gray-400 cursor-pointer hover:text-gray-600" size={20} />
          </button>
      </div>
      </div>
  );
};

export default CheckoutItem;