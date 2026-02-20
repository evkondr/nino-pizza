'use client';
import { cn } from '@/lib/utils';
import { PropsWithClass } from '@/types';
import { ArrowUpDown } from 'lucide-react';
import { useState } from 'react';
const filterOptions = ['Популярное', 'Стоимость по возрастанию', 'Стоимость по убыванию'];
const SortPopup = ({ className }:PropsWithClass) => {
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>(filterOptions[0]);
  const handleSelect = (option: string) => {
    setSelectedOption(option);
    setShowOptions(false);
  };
  return (
    <div className='relative'>
      <div
        onClick={() => setShowOptions(!showOptions)}
        className={cn(
          'inline-flex items-center gap-1 bg-gray-50 px-5 h-[52px] rounded-2xl cursor-pointer w-[400]',
          className,
        )}>
        <ArrowUpDown size={16} />
        <b>Сортировка:</b>
        <b className="text-primary">{selectedOption}</b>
      </div>
      {showOptions && <ul className='mt-1 absolute left-0 top-full w-full flex flex-col gap-1 bg-gray-50 rounded-2xl shadow-lg overflow-hidden z-10'>
        {filterOptions.map((item) => (
          <li
            key={item}
            onClick={() => {
              handleSelect(item);
            }}
            className={cn(
                'px-5 py-2 hover:bg-gray-100 cursor-pointer transition-colors',
                selectedOption === item && 'text-primary font-bold'
              )}
          >{item}</li>
        ))}
      </ul>}
    </div>
    
  );
};

export default SortPopup;