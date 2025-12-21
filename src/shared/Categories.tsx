'use client'
import { Category } from "@/generated/prisma";
import { cn } from "@/lib/utils"
import { useCategoryStore } from "@/store/category";
import { PropsWithClass } from "@/types"
import Link from "next/link";

interface Props extends PropsWithClass {
  items: Category[]
}
const Categories = ({ items, className }:Props) => {
  const { activeId } = useCategoryStore()
  return (
    <div className={cn('inline-flex gap-1 bg-gray-50 rounded-2xl p-1', className)}>
      {items.map(({name, id}) => (
        <Link
          className={cn('flex items-center font-medium h-11 rounded-2xl px-5', activeId == id && 'bg-white shadow-md shadow-gray-200 text-primary' )}
          href={`/#${name}`}
          key={id}
        >
          {name}
        </Link>
      ))}
    </div>

  )
}

export default Categories