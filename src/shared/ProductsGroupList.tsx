'use client';
import { ProductsWithRelations, PropsWithClass } from "@/types";
import Title from "./Title";
import { RefObject, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import ProductCard from "./ProductCard";
import { useIntersection } from 'react-use';
import { useCategoryStore } from "@/store/category";

interface Props extends PropsWithClass {
  title: string;
  items:  ProductsWithRelations[]
  categoryId: number;
  listClassName?: string;
}
const ProductsGroupList = ({
  title,
  items,
  listClassName,
  categoryId,
  className,
}:Props) => {
  const { setActiveId } = useCategoryStore();
  const intersectionRef = useRef<null | HTMLDivElement>(null);
  const intersection = useIntersection(intersectionRef as RefObject<HTMLDivElement>, {
    threshold: 0.4
  });
  useEffect(() => {
    if(intersection?.isIntersecting) {
      setActiveId(categoryId);
    }
  }, [categoryId, intersection?.isIntersecting, setActiveId, title]);
  return (
    <div className={className} id={title} ref={intersectionRef}>
      <Title text={title} size="lg" className="font-extrabold mb-5" />
      <div className={cn('flex flex-wrap justify-between', listClassName)}>
        {items.map((product) => (
          <ProductCard
            className="flex w-[233px] mt-5"
            key={product.id}
            id={product.id}
            name={product.name}
            imageUrl={product.imageUrl}
            price={product.items[0].price}
            ingredients={product.ingredients}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsGroupList;