import React from 'react'
import RequiredSymbol from '../RequiredSymbol';
import { Input } from '@/components/ui/input';
import ErrorText from '../ErrorText';
import { ClearButton } from '../ClearButton';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
}

const FormInput = ({
  className, name, label, required, ...props 
}:Props) => {
  return (
    <div className={className}>
      {label && (
        <p className="font-medium mb-2">
          {label} {required && <RequiredSymbol />}
        </p>
      )}
       <div className="relative">
        <Input className="h-12 text-md" {...props} />
        <ClearButton onClick={() => {}} />
        {/* {value && <ClearButton onClick={() => {}} />} */}
      </div>
      <ErrorText text="Поле обязательно" className='mt-2'/>
    </div>
  )
}

export default FormInput