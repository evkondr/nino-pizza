import { cn } from '@/lib/utils';
import { PropsWithClass } from '@/types';
import { ArrowUpDown } from 'lucide-react';
const SortPopup = ({ className }:PropsWithClass) => {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-1 bg-gray-50 px-5 h-[52px] rounded-2xl cursor-pointer',
        className,
      )}>
      <ArrowUpDown size={16} />
      <b>Сортировка:</b>
      <b className="text-primary">популярное</b>
    </div>
  )
}

export default SortPopup