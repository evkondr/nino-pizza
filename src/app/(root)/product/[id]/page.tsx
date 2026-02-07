import { prisma } from "@/lib/prisma-client";
import { Container } from "@/shared";
import ProductForm from "@/shared/ProductForm";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>
}
export default async function Product({ params }:Props) {
  const {id} = await params;
  const product = await prisma.product.findFirst({
    where: { 
      id: Number(id)
    },
    include: {
      items: true,
      ingredients: true,
    }
  });
  if(!product) {
    return notFound();
  }
  return (
    <Container className="flex flex-col my-18">
      <ProductForm product={product} />
    </Container>
  );
}