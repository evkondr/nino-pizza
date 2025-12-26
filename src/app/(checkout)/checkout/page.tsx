'use client';
import { Container, Title } from "@/shared";
import CheckoutCart from "@/shared/CheckoutCart";
import CheckoutSidebar from "@/shared/CheckoutSidebar";
import { WhiteBlock } from "@/shared/WhiteBlock";
import { useCartStore } from "@/store/cart";
import { useEffect } from "react";

export default function CheckoutPage() {
  const { items,fetchCartItems } = useCartStore()
  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);
  return (
    <Container className="mt-10">
      <Title text="Оформление заказа" className="font-extrabold mb-8 text-[36px]" />
      <div className="flex gap-10">
        <div className="flex flex-col gap-10 flex-1 mb-20">
          <CheckoutCart items={items} removeCartItem={() => {}}  onClickCountButton={() => {}} />
          <WhiteBlock title="2. Персональные данные">
            <div className="grid grid-cols-2 gap-5">
              <input name="firstName" className="text-base" placeholder="Имя" />
              <input name="lastName" className="text-base" placeholder="Фамилия" />
              <input name="email" className="text-base" placeholder="E-Mail" />
              <input name="phone" className="text-base" placeholder="Телефон" />
            </div>
          </WhiteBlock>
          <WhiteBlock title="3. Адрес доставки">
            <div className="flex flex-col gap-5">
              <input name="firstName" className="text-base" placeholder="Имя" />
              <textarea name="comment" className="text-base" placeholder="Комментарий к заказу" rows={5}/>
            </div>
          </WhiteBlock>
        </div>
        <div className="w-[450px]">
          <CheckoutSidebar totalAmount={3000} />
        </div>
      </div>
    </Container>
  );
}