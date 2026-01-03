import React from 'react'
import { WhiteBlock } from '../WhiteBlock'
import FormInput from '../form/FormInput'

const CheckoutAddressForm = () => {
  return (
    <WhiteBlock title="3. Адрес доставки">
      <div className="flex flex-col gap-5">
        <input name="firstName" className="text-base" placeholder="Имя" />
        <FormInput textArea name="comment" className="text-base" placeholder="Комментарий к заказу" />
      </div>
    </WhiteBlock>
  )
}

export default CheckoutAddressForm