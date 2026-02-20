import { Container, Header } from "@/shared";
import { Suspense } from "react";

export default function CheckoutLayout({children}: {children: React.ReactNode}) {
  return (
    <main className="min-h-screen bg-[#F4F1EE]">
      <Container>
        <Suspense>
          <Header hasSearch={false} hasCart={false}  className="border-gray-200" />
        </Suspense>
        {children}
      </Container>
    </main>
  );
}