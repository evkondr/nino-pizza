'use client';
import { Product } from "@/generated/prisma";
import { cn } from "@/lib/utils";
import { apiClient } from "@/services/api-client";
import { PropsWithClass } from "@/types";
import { Search } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useDebounce } from "react-use";

const SearchInput = ({ className }:PropsWithClass) => {
  const [ focused, setFocused ] = useState<boolean>(false);
  const [ searchQuery, setSearchQuery ] = useState<string>('');
  const [ products, setProducts ] = useState<Product[]>([]);
  useDebounce(() => {
    apiClient.productsService.search(searchQuery).then((result) => setProducts(result));
  }, 300, [searchQuery]);
  return (
    <>
      {focused && (<div className="fixed top-0 left-0 right-0 bottom-0 bg-black/50 z-30" />)}
      <div className={cn('flex rounded-2xl flex-1 justify-between relative h-11 z-30', className)}>
        <Search className="absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400" />
        <input
            className="rounded-2xl outline-none w-full bg-gray-100 pl-11"
            type="text"
            placeholder="Найти пиццу..."
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {products?.length > 0 && (<div className={cn(
            'absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30',
            focused && 'visible opacity-100 top-12'
            )}>
              {products?.map((product) => (
              <Link
                key={product.id}
                className="flex items-center w-full gap-2 px-3 py-2 hover:bg-primary/10"
                href={`/product/${product.id}`}
              >
                <Image
                  className="rounded-sm h-8 w-8"
                  width="16"
                  height={16}
                  src={product.imageUrl}
                  alt={product.name} />
                <span>{product.name}</span>
              </Link>) )}
            </div>)}
      </div>
    </>
  );
};

export default SearchInput;