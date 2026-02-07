import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { PropsWithClass } from '@/types';
import React, { PropsWithChildren } from 'react';

interface Props extends PropsWithClass, PropsWithChildren {
  value?: number
  loading?: boolean
}
const CheckoutItemDetails = ({
  value = 0,
  loading = false,
  className,
  children
}:Props) => {
  return (
     <div className={cn('flex my-4', className)}>
        <span className="flex flex-1 text-lg text-neutral-500">
          {children}
          <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
        </span>
        <span className="font-bold text-lg">
          {loading ? <Skeleton className="h-6 w-16 rounded-[6px]" /> : `${value} ₽`}
        </span>
     </div>
  );
};

export default CheckoutItemDetails;