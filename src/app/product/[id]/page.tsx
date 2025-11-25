import { prisma } from "@/lib/prisma-client";
import { Container } from "@/shared";
import ProductImage from "@/shared/ProductImage";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>
}
export default async function Product({ params }:Props) {
  const {id} = await params
  const product = await prisma.product.findFirst({
    where: { id: Number(id)}
  })
  if(!product) {
    return notFound();
  }
  return (
    <Container className="flex flex-col my-18">
      <ProductImage imageUrl={product.imageUrl} size={30}/>
    </Container>
  );
}