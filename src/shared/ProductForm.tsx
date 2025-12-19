'use client'
import { ProductsWithRelations } from '@/types';
import React from 'react'
import ChoosePizzaForm from './ChoosePizzaForm';
import ChooseProductForm from './ChooseProductForm';
import { useCartStore } from '@/store/cart';
interface Props {
  product: ProductsWithRelations;
  navigateBack?: VoidFunction;
}
const ProductForm = ({ product, navigateBack }:Props) => {
  const firstItem = product.items[0];
  const isPizzaForm = Boolean(firstItem.pizzaType);
  const { addCartItem, loading } = useCartStore()
  const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
    try {
      const itemId = productItemId ?? firstItem.id;

      await addCartItem({
        productItemId: itemId,
        ingredients,
      });

      // toast.success(product.name + ' добавлена в корзину');

      navigateBack?.();
    } catch (err) {
      // toast.error('Не удалось добавить товар в корзину');
      console.error(err);
    }
  };
  return isPizzaForm ? ((
    <ChoosePizzaForm
      imageUrl={product.imageUrl}
      name={product.name}
      ingredients={product.ingredients}
      items={product.items}
      onSubmit={onSubmit}
      loading={loading}
    />
  )) : (
  <ChooseProductForm
    imageUrl={product.imageUrl}
    name={product.name}
    onSubmit={onSubmit}
    price={firstItem.price}
    loading={loading}
  />)
}

export default ProductForm