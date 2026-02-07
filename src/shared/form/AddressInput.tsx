'use client';
import React from 'react';
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
      token={process.env.NEXT_PUBLIC_DADATA_KEY as string}
      onChange={(data) => onChange?.(data?.value)}
      containerClassName='relative'
      suggestionsClassName='overflow-y-scroll absolute z-50 bg-white w-full max-h-30'
    />
  );
};

export default AddressInput;