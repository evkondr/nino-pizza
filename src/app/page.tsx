import { prisma } from "@/lib/prisma-client";
import { Container, Filters, Title, TopBar } from "@/shared";
import ProductsGroupList from "@/shared/ProductsGroupList";

export default async function Home() {
  const categories = await prisma.category.findMany({
    include: {
      products: {
        include: {
          items: true,
          ingredients: true
        }
      }
    }
  });
  console.log( categories);
  return (
    <>
      <Container className="mt-8">
         <Title text="Все пиццы"  size="sm" className="font-bold"/>
      </Container>
      <TopBar categories={categories}/>
      <Container className="mt-10 pb-14">
        <div className="flex gap-[80px]">
          {/* Левый сайдбар */}
          <div className="w-[250px]">
            <Filters />
          </div>
          {/* Продукты */}
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              {categories.map((category) =>  (
                <ProductsGroupList 
                  key={category.id}
                  categoryId={category.id}
                  title={category.name} items={category.products}  />
              ))}
              
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
