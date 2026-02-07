import { cn } from '@/lib/utils';
import { PropsWithClass } from '@/types';
import { CircleCheck } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

interface Props extends PropsWithClass{
  imageUrl: string;
  name: string;
  price: number;
  active?: boolean;
  onClick?: () => void;
}
const IngredientsItem = ({
  className,
  active,
  price,
  name,
  imageUrl,
  onClick,
}:Props) => {
  return (
    <div 
      className={cn(
        'flex items-center flex-col p-1 rounded-md w-32 text-center relative cursor-pointer shadow-md bg-white',
        {'border border-primary': active},
        className,
      )}
      onClick={onClick}
    >
      {active && <CircleCheck className="absolute top-2 right-2 text-primary" />}
      <Image width={110} height={110} src={imageUrl} alt={name}/>
      <span className="text-xs mb-1">{name}</span>
      <span className="font-bold">{price} ₽</span>
    </div>
  );
};

export default IngredientsItem;