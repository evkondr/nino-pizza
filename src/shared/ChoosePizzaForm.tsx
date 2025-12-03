import { Ingredient, ProductItem } from "@/generated/prisma";
import { cn } from "@/lib/utils";
import ProductImage from "./ProductImage";
import Title from "./Title";
import { Button } from "@/components/ui/button";

interface Props {
  imageUrl: string;
  name: string;
  ingredients: Ingredient[];
  items: ProductItem[];
  loading?: boolean;
  onSubmit: (itemId: number, ingredients: number[]) => void;
  className?: string;
}
export default function ChoosePizzaForm({
  name,
  items,
  imageUrl,
  ingredients,
  loading,
  onSubmit,
  className,
}:Props) {
  const textDetails = "lorem ipsum";
  const size = 30;
  const handleClickAdd = () => {
    
  };
  return (
    <div className={cn(className, 'flex flex-1')}>
      <ProductImage imageUrl={imageUrl} size={size} />
      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />
        <p className="text-gray-400">{textDetails}</p>
        <Button
          loading={loading}
          onClick={handleClickAdd}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
          Добавить в корзину за  ₽
        </Button>
      </div>
    </div>
  );
}