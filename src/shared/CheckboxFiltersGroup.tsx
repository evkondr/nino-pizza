import { Input } from '@/components/ui/input';
import { FilterCheckBoxProps, PropsWithClass } from '@/types';
import React from 'react'
import FilterCheckbox from './FilterCheckbox';

interface Props extends PropsWithClass {
  title: string;
  items: FilterCheckBoxProps[];
  defaultItems?: FilterCheckBoxProps[];
  limit?: number;
  loading?: boolean;
  searchInputPlaceholder?: string;
  onClickCheckbox?: (id: string) => void;
  defaultValue?: string[];
  selected?: Set<string>;
  className?: string;
  name?: string;
}
const CheckboxFiltersGroup = ({ title, items, searchInputPlaceholder, className }:Props) => {
  const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    
  };
  return (
    <div className={className}>
      <p className="font-bold mb-3">{title}</p>
      <div className="mb-5">
        <Input
          onChange={onChangeSearchInput}
          placeholder={searchInputPlaceholder}
          className="bg-gray-50 border-none"
        />
      </div>
      <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
        {items.map((item, index) => (<FilterCheckbox
            key={index}
            text={item.text}
            value={item.value}
            endAdornment={item.endAdornment}
            checked={false}
            onCheckedChange={() => console.log(item.value)}
          />))}
      </div>
    </div>
  )
}

export default CheckboxFiltersGroup