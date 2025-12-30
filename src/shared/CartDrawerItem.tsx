import { cn } from '@/lib/utils'
import { CartItemProps, PropsWithClass } from '@/types'
import { Trash2Icon } from 'lucide-react'
import Image from 'next/image'
import { CountButton } from './CountButton';

interface CartDrawerItemProps extends CartItemProps, PropsWithClass {
  onClickCountButton?: (type: 'plus' | 'minus') => void;
  onClickRemove?: () => void;
}
const CartDrawerItem = ({ name, details, quantity, imageUrl, price, className, disabled, onClickCountButton, onClickRemove }:CartDrawerItemProps) => {
  return (
    <div
      className={cn(
        'flex bg-white p-5 gap-6',
        {
          'opacity-50 pointer-events-none': disabled,
        },
        className,
      )}>
        <Image
          width={60}
          height={60}
          className={cn('w-[60px] h-[60px]')}
          src={imageUrl} alt={name}
        />
        <div className="flex-1">
          <div className={cn('flex items-center justify-between')}>
            <h2 className="text-lg font-bold flex-1 leading-6">{name}</h2>
          </div>
          {details && <p className="text-xs text-gray-400 w-[90%]">{details}</p>}
          <hr className="my-3" />
          <div className="flex items-center justify-between">
            <CountButton onClick={onClickCountButton} value={quantity} />

            <div className="flex items-center gap-3">
              <h2 className={cn('font-bold', className)}>{price} ₽</h2>;
              <Trash2Icon
                onClick={onClickRemove}
                className="text-gray-400 cursor-pointer hover:text-gray-600"
                size={16}
              />
            </div>
          </div>
        </div>
      </div>
  )
}

export default CartDrawerItem