import React from 'react'
import { WhiteBlock } from '../WhiteBlock'
import FormInput from '../form/FormInput'
import AddressInput from '../form/AddressInput'

const CheckoutAddressForm = () => {
  return (
    <WhiteBlock title="3. Адрес доставки">
      <div className="flex flex-col gap-5">
        <AddressInput />
        <FormInput textArea name="comment" className="text-base" placeholder="Комментарий к заказу" />
      </div>
    </WhiteBlock>
  )
}

export default CheckoutAddressForm