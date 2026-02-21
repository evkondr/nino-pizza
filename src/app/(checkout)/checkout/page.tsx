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
import { useEffect, useState } from "react";
import { createOrder } from "@/lib/actions";
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
import { apiClient } from "@/services/api-client";


export default function CheckoutPage() {
  const { items, removeCartItem, updateItemQuantity, loading, totalAmount } = useCart();
  const [submitting, setSubmitting] = useState<boolean>(false);
  const router = useRouter();
  const { data: session } = useSession();
  const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };
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
    try {
      setSubmitting(true);
      const url = await createOrder(data);
      toast.success('Заказ успешно оформлен! 📝 Переход на оплату... ', {
        icon: '✅',
      });
      if (url) {
        router.push(url);
      }
    } catch (err) {
      console.log(err);
      setSubmitting(false);
      toast.error('Не удалось создать заказ', {
        icon: '❌',
      });
    }
  };
  useEffect(() => {
    async function fetchUserInfo() {
      const data = await apiClient.authService.getMe();
      const [firstName, lastName] = data.fullName.split(' ');
      form.setValue('firstName', firstName);
      form.setValue('lastName', lastName);
      form.setValue('email', data.email);
    }
    if (session) {
      fetchUserInfo();
    }
  }, [form, session]);
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
              <CheckoutSidebar totalAmount={totalAmount} loading={loading || submitting} />
            </div>
          </div>
        </form>
      </FormProvider>
      
    </Container>
  );
}