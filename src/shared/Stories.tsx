import { PropsWithClass } from '@/types';
import React from 'react';
import Container from './Container';
import { cn } from '@/lib/utils';

const Stories = ({ className }:PropsWithClass) => {
  return (
    <>
      <Container className={cn('flex items-center justify-between gap-2 my-10', className)}>
      
      </Container>
    </>
  );
};

export default Stories;