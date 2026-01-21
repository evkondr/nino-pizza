import { z } from 'zod';
// Checkout
export const checkoutFormSchema = z.object({
  firstName: z.string().min(2, { message: 'Имя должно содержать не менее 2-х символов' }),
  lastName: z.string().min(2, { message: 'Фамилия должна содержать не менее 2-х символов' }),
  email: z.string().email({ message: 'Введите корректную почту' }),
  phone: z.string().min(10, { message: 'Введите корректный номер телефона' }),
  address: z.string().min(5, { message: 'Введите корректный адрес' }),
  comment: z.string().optional(),
});
export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

// Auth
export const passwordSchema = z.string().min(4, { message: 'Введите корректный пароль' });
export const formLoginSchema = z.object({
  email: z.email({ message: 'Введите корректную почту' }),
  password: passwordSchema,
});
export const formRegisterSchema = formLoginSchema.extend({
  fullName: z.string().min(2, { message: 'Введите имя и фамилию' }),
  confirmPassword: passwordSchema,
}).refine((data) => data.password == data.confirmPassword, {
  message: 'Пароли не совпадают',
  path: ['confirmPassword'],
});

export type TFormLoginValues = z.infer<typeof formLoginSchema>;
export type TFormRegisterValues = z.infer<typeof formRegisterSchema>;


