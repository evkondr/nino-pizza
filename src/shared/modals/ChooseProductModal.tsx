'use client';

import { cn } from "@/lib/utils";
import { ProductsWithRelations } from "@/types";

import { useRouter } from "next/navigation";
import ProductForm from "../ProductForm";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";


interface Props {
  product: ProductsWithRelations;
  className?: string;
}
const ChooseProductModal = ({ product, className}:Props) => {
  const router = useRouter();
  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()} >
      <div className="hidden">
        <DialogTitle>{product.name}</DialogTitle>
      </div>
      <DialogContent
        className={cn(
          'p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden',
          className,
        )}>
        <ProductForm product={product} navigateBack={() => router.back()} />
      </DialogContent>
    </Dialog>
  );
};

export default ChooseProductModal;