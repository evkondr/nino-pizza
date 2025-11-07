import { PropsWithClass } from "@/types";
import Title from "./Title";
import { RefObject, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import ProductCard from "./ProductCard";
import { useIntersection } from 'react-use';

interface Props extends PropsWithClass {
  title: string;
  items: any[];
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
  const intersectionRef = useRef<null | HTMLDivElement>(null);
  const intersection = useIntersection(intersectionRef as RefObject<HTMLDivElement>, {
    threshold: 1
  });
  useEffect(() => {
    if(intersection?.isIntersecting) {
      console.log(title)
    }
  }, [intersection?.isIntersecting, title])
  return (
    <div className={className} id={title} ref={intersectionRef}>
      <Title text={title} size="lg" className="font-extrabold mb-5" />
      <div className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
        {items.map((product) => (
          <ProductCard
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
  )
}

export default ProductsGroupList