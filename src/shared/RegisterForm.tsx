'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';

import { Button } from '@/components/ui/button';
import FormInput from './form/FormInput';
import { formRegisterSchema, TFormRegisterValues } from '@/lib/schemas';
import { registerUserAction } from '@/lib/actions';

interface Props {
  onClose?: VoidFunction;
  onClickLogin?: VoidFunction;
}
const RegisterForm = ({ onClose, onClickLogin }:Props) => {
   const form = useForm<TFormRegisterValues>({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      email: '',
      fullName: '',
      password: '',
      confirmPassword: '',
    },
  });
  const onSubmit = async (data: TFormRegisterValues) => {
    try {
      await registerUserAction({
        email: data.email,
        fullName: data.fullName,
        password: data.password,
      });

      toast.error('Регистрация успешна 📝. Подтвердите свою почту', {
        icon: '✅',
      });

      onClose?.();
    } catch (error) {
      return toast.error('Неверный E-Mail или пароль', {
        icon: '❌',
      });
    }
  };
  return (
    <FormProvider {...form}>
        <form className="flex flex-col gap-5 w-96 mt-10" onSubmit={form.handleSubmit(onSubmit)}>
          <FormInput name="email" label="E-Mail" required />
          <FormInput name="fullName" label="Полное имя" required />

          <FormInput type="password" name="password" label="Новый пароль" required />
          <FormInput type="password" name="confirmPassword" label="Повторите пароль" required />
          
          <Button loading={form.formState.isSubmitting} className="h-12 text-base" type="submit">
            Зарегистрироваться
          </Button>
        </form>
      </FormProvider>
  );
};

export default RegisterForm;
