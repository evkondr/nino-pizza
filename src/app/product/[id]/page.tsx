import { prisma } from "@/lib/prisma-client";
import { Container, Title } from "@/shared";
import GroupVariants from "@/shared/GroupVariants";
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
      <div className="flex flex-1">
        <ProductImage imageUrl={product.imageUrl} size={30}/>
        <div className="w=[490] bg-[#f7f6f5] p-7">
          <Title text={product.name} size="md" className="front-extrabold mb-1" />
          <GroupVariants items={[
            {
              name: "Маленькая",
              value: "1"
            },
            {
              name: "Средняя",
              value: "2"
            },
            {
              name: "Большая",
              value: "3",
              disabled: true
            },
          ]}
          value="1"
        />
        </div>
      </div>
    </Container>
  );
}