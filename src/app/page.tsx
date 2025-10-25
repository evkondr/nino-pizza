import { Container, Title, TopBar } from "@/shared";

export default function Home() {
  return (
    <>
      <Container className="mt-8">
         <Title text="Все пиццы"  size="sm" className="font-bold"/>
      </Container>
      <TopBar />
    </>
  );
}
