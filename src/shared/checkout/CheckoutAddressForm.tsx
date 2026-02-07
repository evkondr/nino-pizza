import React from 'react';
import { WhiteBlock } from '../WhiteBlock';
import FormInput from '../form/FormInput';
import AddressInput from '../form/AddressInput';
import { Controller, useFormContext } from 'react-hook-form';
import ErrorText from '../ErrorText';
import { PropsWithClass } from '@/types';

const CheckoutAddressForm = ({ className }:PropsWithClass) => {
  const { control } = useFormContext();
  return (
    <WhiteBlock title="3. Адрес доставки" className={className} >
      <div className="flex flex-col gap-5">
        <Controller 
          control={control}
          name='address'
          render={({ field, fieldState }) => (
            <>
              <AddressInput onChange={field.onChange}/>
              {fieldState.error?.message && <ErrorText text={fieldState.error.message} />}
            </>
          )}
        />
        
        <FormInput textArea name="comment" className="text-base" placeholder="Комментарий к заказу" />
      </div>
    </WhiteBlock>
  );
};

export default CheckoutAddressForm;