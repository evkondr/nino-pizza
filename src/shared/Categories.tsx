import { cn } from "@/lib/utils"
import { PropsWithClass } from "@/types"
import Link from "next/link";

interface Props extends PropsWithClass {
  items?: []
}
const categories = ['Пицца', 'Комбо', 'Закуски', 'Коктейли', 'Напитки'];
const Categories = ({ className }:Props) => {
  const activeCategory = 0;
  return (
    <div className={cn('inline-flex gap-1 bg-gray-50 rounded-2xl p-1', className)}>
      {categories.map((name, index) => (
        <Link
          className={cn('flex items-center font-medium h-11 rounded-2xl px-5', activeCategory == index && 'bg-white shadow-md shadow-gray-200 text-primary' )}
          href={`/#${name}`}
          key={name}
        >
          {name}
        </Link>
      ))}
    </div>

  )
}

export default Categories