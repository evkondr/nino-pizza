import type { Metadata } from "next";
import "../globals.css";
import Header from "@/shared/Header";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: {
    default: "NiNo Pizza",
    template: "%s | NiNo Pizza",
  },
  description: "Доставки пиццы по всему городу",
};

export default function RootLayout({
  children,
  modal
}: Readonly<{
  children: React.ReactNode
  modal: React.ReactNode,
}>) {
  return (
    <main className="min-h-screen">
      <Suspense>
        <Header />
      </Suspense>
      {children}
      {modal}
    </main>
  );
}
