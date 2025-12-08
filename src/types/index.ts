import { Prisma } from "@/generated/prisma";

export interface PropsWithClass {
  className?: string
}
export interface FilterCheckBoxProps {
  text: string;
  value: string;
  endAdornment?: React.ReactNode;
  onCheckedChange?: (checked: boolean) => void;
  checked?: boolean;
  name?: string;
}
export interface CategoryStoreState {
  activeId: number;
  setActiveId: (activeId: number) => void;
}
export interface PriceRange { 
  from?: number,
  to?: number
}
export enum ApiRoutes {
  SEARCH_PRODUCTS = '/products/search',
  INGREDIENTS = '/ingredients',
}
export interface Filters {
  sizes: Set<string>;
  pizzaTypes: Set<string>;
  selectedIngredients: Set<string>;
  prices: PriceRange;
}
export type Variant = {
  name: string;
  value: string;
  disabled?: boolean;
};
export type ProductsWithRelations = Prisma.ProductGetPayload<{
  include: {
    ingredients: true,
    items: true,
  }
}>
export interface CartItemProps {
  id: number;
  imageUrl: string;
  details: string;
  name: string;
  price: number;
  quantity: number;
  disabled?: boolean;
}