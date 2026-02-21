import { prisma } from "@/lib/prisma-client";
import { Container } from "@/shared";
import ProductForm from "@/shared/ProductForm";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>
}
export async function generateMetadata(
  { params }: Props,
): Promise<Metadata> {
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
  return {
    title: product?.name,
    description: product?.ingredients.map((ingredient) => ingredient.name).join(', '),
  };
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