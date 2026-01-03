import React from 'react'
import { WhiteBlock } from '../WhiteBlock'

const CheckoutAddressForm = () => {
  return (
    <WhiteBlock title="3. Адрес доставки">
      <div className="flex flex-col gap-5">
        <input name="firstName" className="text-base" placeholder="Имя" />
        <textarea name="comment" className="text-base" placeholder="Комментарий к заказу" rows={5}/>
      </div>
    </WhiteBlock>
  )
}

export default CheckoutAddressForm