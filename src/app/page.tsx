import { Container, Filters, Title, TopBar } from "@/shared";

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
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
