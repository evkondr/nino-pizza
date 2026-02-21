import { Container, Header } from "@/shared";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: 'NiNo Pizza | Оформление заказа ',
  description: 'Оформление заказа NiNo Pizza',
}
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