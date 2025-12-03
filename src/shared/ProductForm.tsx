import { ProductsWithRelations } from '@/types';
import React from 'react'
import ChoosePizzaForm from './ChoosePizzaForm';
interface Props {
  product: ProductsWithRelations;
  onSubmit?: VoidFunction;
}
const ProductForm = ({ product, onSubmit: _onSubmit}:Props) => {
  return (
    <ChoosePizzaForm imageUrl={product.imageUrl} name={product.name} ingredients={[]} items={[]} onSubmit={() => {}} />
  )
}

export default ProductForm