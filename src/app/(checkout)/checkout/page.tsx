'use client';
import { useCart } from "@/hooks/useCart";
import { Container, Title } from "@/shared";
import { FormProvider, useForm } from 'react-hook-form';
import CheckoutAddressForm from "@/shared/checkout/CheckoutAddressForm";
import CheckoutCart from "@/shared/checkout/CheckoutCart";
import CheckoutPersonalForm from "@/shared/checkout/CheckoutPersonalForm";
import CheckoutSidebar from "@/shared/checkout/CheckoutSidebar";
import { zodResolver } from '@hookform/resolvers/zod';
import { checkoutFormSchema, CheckoutFormValues } from "@/lib/schemas";


export default function CheckoutPage() {
  const { items, removeCartItem, updateItemQuantity, loading } = useCart()
  const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  }
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      address: '',
      comment: '',
    }
  });
  const onSubmit = async (data: CheckoutFormValues) => {
    console.log(data)
  }
  return (
    <Container className="mt-10">
      <Title text="Оформление заказа" className="font-extrabold mb-8 text-[36px]" />
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-10">
            <div className="flex flex-col gap-10 flex-1 mb-20">
              <CheckoutCart items={items} removeCartItem={removeCartItem}  onClickCountButton={onClickCountButton} loading={loading} />
              <CheckoutPersonalForm className={loading ? 'opacity-40 pointer-events-none' : ''} />
              <CheckoutAddressForm className={loading ? 'opacity-40 pointer-events-none' : ''} />
            </div>
            <div className="w-[450px]">
              <CheckoutSidebar totalAmount={3000} loading={loading} />
            </div>
          </div>
        </form>
      </FormProvider>
      
    </Container>
  );
}