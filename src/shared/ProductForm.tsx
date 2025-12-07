import { ProductsWithRelations } from '@/types';
import React from 'react'
import ChoosePizzaForm from './ChoosePizzaForm';
import ChooseProductForm from './ChooseProductForm';
interface Props {
  product: ProductsWithRelations;
  onSubmit?: VoidFunction;
}
const ProductForm = ({ product, onSubmit: _onSubmit}:Props) => {
  const isPizza = Boolean(product.items[0].pizzaType);
  return isPizza ? ((
    <ChoosePizzaForm imageUrl={product.imageUrl} name={product.name} ingredients={product.ingredients} items={product.items} onSubmit={() => {}} />
  )) : (<ChooseProductForm imageUrl={product.imageUrl} name={product.name} onSubmit={() => { } } price={0} />)
}

export default ProductForm