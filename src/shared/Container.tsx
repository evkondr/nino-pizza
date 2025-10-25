import { cn } from '@/lib/utils';
import { PropsWithChildren } from 'react';

interface Props {
  className?: string;
}

const Container = ({ className, children }:PropsWithChildren<Props>) => {
  return <div className={cn('mx-auto max-w-[1280px]', className)}>{children}</div>;
};

export default Container;