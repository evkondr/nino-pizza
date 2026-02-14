import { httpInstance } from "@/lib/http-instance";
import { IStory } from "@/types";


export const getAll = async () => {
  const { data } = await httpInstance.get<IStory[]>('/stories');

  return data;
};