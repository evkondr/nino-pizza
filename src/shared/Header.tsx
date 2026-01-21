'use client';
import { cn } from '../lib/utils'
import { CartButton, Container, ProfileButton, SearchInput } from '.';
import Link from 'next/link';
import Image from 'next/image';
import { PropsWithClass } from '@/types';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import AuthModal from './modals/AuthModal';

interface Props extends PropsWithClass {
  hasSearch?: boolean;
  hasCart?: boolean;
}
const Header = ({ className, hasSearch = true, hasCart = true }:Props) => {
  const [ openAuthModal, setOpenAuthModal ] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  useEffect(() => {
    if (searchParams.has('paid')) {
      router.replace('/');
      toast.success('Заказ успешно оплачен! Информация отправлена на почту.', {
        duration: 3000,
      });
    }
  }, [])
  return (
    <header className={cn('border-b', className)}>
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
          <AuthModal open={openAuthModal} onClose={() => setOpenAuthModal(false)} />
          <ProfileButton onClickSignIn={() => setOpenAuthModal(true)}  />
          {hasCart && <CartButton />}
        </div>
      </Container>
    </header>
  )
}

export default Header