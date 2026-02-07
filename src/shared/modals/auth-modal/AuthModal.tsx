import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import React from 'react';
import LoginForm from './LoginForm';
import RegisterForm from '@/shared/RegisterForm';

interface Props {
  open: boolean;
  onClose: () => void;  
}
const AuthModal = ({
  open,
  onClose
}:Props) => {
  const [type, setType] = React.useState<'login' | 'register'>('login');

  const onSwitchType = () => {
    setType(type === 'login' ? 'register' : 'login');
  };
  const handleClose = () => {
    onClose();
  };
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="w-[450px] bg-white p-10">
        {type === 'login' ? (
          <LoginForm onClose={handleClose} />
        ) : (
          <RegisterForm onClose={handleClose} />
        )}
        <div className="flex gap-2">
          <Button
            variant="secondary"
            onClick={() =>
              signIn('github', {
                callbackUrl: '/',
                redirect: true,
              })
            }
            type="button"
            className="gap-2 h-12 p-2 flex-1">
            <Image
              className="w-6 h-6"
              width={24}
              height={24}
              src="https://github.githubassets.com/favicons/favicon.svg"
              alt="github favicon"
            />
            GitHub
          </Button>
          <Button
            variant="secondary"
            onClick={() =>
              signIn('google', {
                callbackUrl: '/',
                redirect: true,
              })
            }
            type="button"
            className="gap-2 h-12 p-2 flex-1">
            <Image
              className="w-6 h-6"
              width={24}
              height={24}
              src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
              alt="google favicon"
            />
            Google
          </Button>
        </div>
        <Button variant="outline" onClick={onSwitchType} type="button" className="h-12">
          {type !== 'login' ? 'Войти' : 'Регистрация'}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;