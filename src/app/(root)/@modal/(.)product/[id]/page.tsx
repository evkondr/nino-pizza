import { prisma } from "@/lib/prisma-client";
import ChooseProductModal from "@/shared/modals/ChooseProductModal";
import { ProductsWithRelations } from "@/types";

interface Props {
  params: Promise<{ id: string }>
}
const ProductModalPage = async ({ params }: Props) => {
  const {id} = await params
  const product = await prisma.product.findFirst({
    where: {
      id: Number(id),
    },
    include: {
      ingredients: true,
      items: true,
    },
  })
  return (
    <ChooseProductModal product={product as ProductsWithRelations} />
  );
}
export default ProductModalPage;