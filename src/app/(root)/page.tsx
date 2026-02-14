import { findPizzas, GetSearchParams } from "@/lib/find-pizzas";
import { Container, Filters, Title, TopBar } from "@/shared";
import ProductsGroupList from "@/shared/ProductsGroupList";
import Stories from "@/shared/Stories";
import { Suspense } from "react";

export default async function Home({ searchParams }: { searchParams: Promise<GetSearchParams> }) {
  const categories = await findPizzas(await searchParams);
  return (
    <>
      <Container className="mt-8">
         <Title text="Все пиццы"  size="sm" className="font-bold"/>
      </Container>
      <TopBar categories={categories.filter((category) => category.products.length > 0)}/>
      <Stories />
      <Container className="mt-10 pb-14">
        <div className="flex gap-[80px]">
          {/* Левый сайдбар */}
          <div className="w-[250px]">
            <Suspense>
              <Filters />
            </Suspense>
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
