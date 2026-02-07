import { CircleUser, User } from 'lucide-react';
import React from 'react';
import { Button } from '../components/ui/button';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { PropsWithClass } from '@/types';

interface Props extends PropsWithClass {
  onClickSignIn?: () => void;
}

const ProfileButton = ({
  onClickSignIn,
  className
}:Props) => {
  const { data:session } = useSession();
  return (
    <div className={className}>
      {!session ? (
      <Button onClick={onClickSignIn} variant="outline" className="flex items-center gap-1 cursor-pointer">
        <User size={16} />
        Войти
      </Button>) : (<Link href='/profile'>
      <Button variant="secondary" className="flex items-center gap-2">
        <CircleUser size={16} />
        Профиль
      </Button>
    </Link>)}
    </div>
  );
};

export default ProfileButton;