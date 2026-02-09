import { User } from "@/generated/prisma";
import { httpInstance } from "@/lib/http-instance";

export const getMe = async () => {
  const { data } = await httpInstance.get<User>('/auth/me');
  return data;
};