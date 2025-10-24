import React from 'react'
import { cn } from './lib/utils'
import { CartButton, Container, ProfileButton, SearchInput } from '.';
import Link from 'next/link';
import Image from 'next/image';

interface Props {
  hasSearch?: boolean;
  hasCart?: boolean;
  className?: string;
}
const Header = ({ className, hasSearch }:Props) => {
  return (
    <header className={cn('', className)}>
      <Container className="flex items-center justify-between py-8">
        <Link href="/">
          <div className="flex items-center gap-4">
            <Image src="/Logo.png" alt="Logo" width={50} height={50} />
            <div>
              <h1 className="text-2xl uppercase font-black">NiNo Pizza</h1>
              <p className="text-sm text-gray-400 leading-3">вкусней уже некуда</p>
            </div>
          </div>
        </Link>
         {hasSearch && (
          <div className="mx-10 flex-1">
            <SearchInput />
          </div>
        )}
        <div className="flex items-center gap-3">
          <ProfileButton />
          <CartButton />
        </div>
      </Container>
    </header>
  )
}

export default Header