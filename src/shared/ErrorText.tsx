import { cn } from '@/lib/utils';
import { PropsWithClass } from '@/types';
import React from 'react'

interface Props extends PropsWithClass {
  text: string;
}
const ErrorText = ({
  text,
  className
}:Props) => {
  return (
    <p className={cn('text-red-500 text-sm', className)}>{text}</p>
  )
}

export default ErrorText