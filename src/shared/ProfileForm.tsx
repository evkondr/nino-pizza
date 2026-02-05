'use client'
import { User } from "@/generated/prisma";
import Container from "./Container"
import Title from "./Title"
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import FormInput from "./form/FormInput";
import { signOut } from "next-auth/react";
import { TFormRegisterValues } from "@/lib/schemas";

interface Props {
  data: User;
}
const ProfileForm = ({ data }:Props) => {
  const form = useForm({
    defaultValues: {
      fullName: data.fullName,
      email: data.email,
      password: '',
      confirmPassword: '',
    }
  });
  const onSubmit = async (data: TFormRegisterValues) => {
    
  };
  const onClickSignOut = () => {
    signOut({
      callbackUrl: '/',
    });
  };
  return (
    <Container className="my-10">
      <Title text={`Личные данные | #${data.id}`} size="md" className="font-bold" />

      <FormProvider {...form}>
        <form className="flex flex-col gap-5 w-96 mt-10" onSubmit={form.handleSubmit(onSubmit)}>
          <FormInput name="email" label="E-Mail" required />
          <FormInput name="fullName" label="Полное имя" required />

          <FormInput type="password" name="password" label="Новый пароль" required />
          <FormInput type="password" name="confirmPassword" label="Повторите пароль" required />

          <Button disabled={form.formState.isSubmitting} className="text-base mt-10" type="submit">
            Сохранить
          </Button>

          <Button
            onClick={onClickSignOut}
            variant="secondary"
            disabled={form.formState.isSubmitting}
            className="text-base"
            type="button">
            Выйти
          </Button>
        </form>
      </FormProvider>
    </Container>
  )
}

export default ProfileForm