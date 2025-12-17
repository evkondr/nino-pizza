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
  CART = '/cart'
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
export type CartStateItem = {
  id: number;
  quantity: number;
  name: string;
  imageUrl: string;
  price: number;
  disabled?: boolean;
  pizzaSize?: number | null;
  pizzaType?: number | null;
  ingredients: Array<{ name: string; price: number }>;
};
export type CartDto = Prisma.CartGetPayload<{
  include: {
    items: {
      include: {
        productItem: {
          include: {
            product: true
          }
        },
        ingredients: true
      }
    }
  }
}>
export interface CartState {
  loading: boolean;
  error: boolean;
  totalAmount: number;
  items: CartStateItem[];

  /* Получение товаров из корзины */
  fetchCartItems: () => Promise<void>;

  /* Запрос на обновление количества товара */
  updateItemQuantity: (id: number, quantity: number) => Promise<void>;

  /* Запрос на добавление товара в корзину CreateCartItemValues*/
  addCartItem: (values: CreateCartItemValues) => Promise<void>;

  /* Запрос на удаление товара из корзины */
  removeCartItem: (id: number) => Promise<void>;
}
export interface CreateCartItemValues {
  productItemId: number;
  ingredients?: number[];
}