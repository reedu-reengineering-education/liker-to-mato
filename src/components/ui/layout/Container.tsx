'use client';

import { cn } from '@/lib/utils';
import { tokens } from '@/lib/design-tokens';
import { ElementType, ComponentPropsWithoutRef } from 'react';

type ContainerProps<T extends ElementType = 'div'> = {
  as?: T;
  size?: 'sm' | 'md' | 'lg' | 'xl';
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'size'>;

const sizes = {
  sm: 'max-w-2xl',
  md: 'max-w-4xl',
  lg: 'max-w-6xl',
  xl: 'max-w-7xl',
};

export function Container<T extends ElementType = 'div'>({
  children,
  className,
  as,
  size = 'lg',
  ...props
}: ContainerProps<T>) {
  const Component = as || 'div';

  return (
    <Component
      className={cn('mx-auto w-full px-4 sm:px-6 lg:px-8', sizes[size], className)}
      {...props}
    >
      {children}
    </Component>
  );
}
