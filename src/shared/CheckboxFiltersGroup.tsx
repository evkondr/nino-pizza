'use client';
import { Input } from '@/components/ui/input';
import { FilterCheckBoxProps, PropsWithClass } from '@/types';
import React, { useState } from 'react';
import FilterCheckbox from './FilterCheckbox';
import { Skeleton } from '@/components/ui/skeleton';

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
const CheckboxFiltersGroup = ({
  title,
  items,
  limit = 5,
  defaultItems,
  searchInputPlaceholder = 'Поиск...',
  className,
  loading,
  selected,
  onClickCheckbox,
  name
}:Props) => {
  const [showAll, setShowAll] = useState<boolean>(false);
  const [ searchValue, setSearchValue ] = useState<string>('');

  const list = showAll ?
    items.filter((item) => 
      item.text.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()))
      :
      (defaultItems || items).slice(0, limit);

  const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  if(loading) {
    return (
      <div className={className}>
        <p className="font-bold mb-3">{title}</p>
        {[...new Array(limit)].map((_, index) => (
          <Skeleton key={index} className="h-6 mb-4 rounded-xl" />
        ))}
        <Skeleton className="w-28 h-6 mb-4 rounded-xl" />
      </div>
    );
  }
  return (
    <div className={className}>
      <p className="font-bold mb-3">{title}</p>
      {showAll && (
        <div className="mb-5">
          <Input
            onChange={onChangeSearchInput}
            placeholder={searchInputPlaceholder}
            className="bg-gray-50 border-none"
          />
        </div>
      )}
      <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
        {list.map((item, index) => (<FilterCheckbox
            key={index}
            name={name}
            text={item.text}
            value={item.value}
            endAdornment={item.endAdornment}
            checked={selected?.has(item.value)}
            onCheckedChange={() => onClickCheckbox?.(item.value)}
          />))}
      </div>
      {items.length > limit && (
        <div className={showAll ? 'border-t border-t-neutral-100 mt-4' : ''}>
          <button onClick={() => setShowAll(!showAll)} className="text-primary mt-3">
            {showAll ? 'Скрыть' : '+ Показать все'}
          </button>
        </div>
      )}
    </div>
  );
};

export default CheckboxFiltersGroup;