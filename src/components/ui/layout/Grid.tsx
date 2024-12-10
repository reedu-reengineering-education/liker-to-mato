import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface GridProps {
  children: ReactNode;
  className?: string;
  cols?: 1 | 2 | 3 | 4 | 6 | 12;
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const colsConfig = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  6: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6',
  12: 'grid-cols-3 sm:grid-cols-4 lg:grid-cols-12',
};

const gapConfig = {
  xs: 'gap-2',
  sm: 'gap-4',
  md: 'gap-6',
  lg: 'gap-8',
  xl: 'gap-12',
};

export function Grid({ children, className, cols = 1, gap = 'md' }: GridProps) {
  return <div className={cn('grid', colsConfig[cols], gapConfig[gap], className)}>{children}</div>;
}
