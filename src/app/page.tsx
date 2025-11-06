'use client'
import { Container, Filters, Title, TopBar } from "@/shared";
import ProductsGroupList from "@/shared/ProductsGroupList";

export default function Home() {
  return (
    <>
      <Container className="mt-8">
         <Title text="Все пиццы"  size="sm" className="font-bold"/>
      </Container>
      <TopBar />
      <Container className="mt-10 pb-14">
        <div className="flex gap-[80px]">
          {/* Левый сайдбар */}
          <div className="w-[250px]">
            <Filters />
          </div>
          {/* Продукты */}
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              <ProductsGroupList title="Пицца" items={[{
                id: 1,
                name: 'Пицца с хреном',
                imageUrl: 'https://media.dodostatic.net/image/r:584x584/0199b8e98ec871ab8a443887a3e1a136.avif',
                price: 550,
                items: [{ price: 550 }],
                ingredients: []
              }]} categoryId={0} />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
