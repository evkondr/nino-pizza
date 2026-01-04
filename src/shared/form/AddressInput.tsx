import React from 'react'
import { AddressSuggestions } from 'react-dadata';
import 'react-dadata/dist/react-dadata.css';

interface Props {
  onChange?: (value?: string) => void;
}
const AddressInput = ({
  onChange
}:Props) => {
  return (
    <AddressSuggestions
      token="token"
      onChange={(data) => onChange?.(data?.value)}
    />
  )
}

export default AddressInput