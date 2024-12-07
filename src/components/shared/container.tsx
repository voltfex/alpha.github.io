import { cn } from '@/lib/utils';
import React from 'react';

interface Props {
  className?: string;
  children: React.ReactNode;
}

export const Container: React.FC<Props> = ({ children }) => {
  return <div className={cn('mx-auto max-w-[1240px]')}>{children}</div>;
};
