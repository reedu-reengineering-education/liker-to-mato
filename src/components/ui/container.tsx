import { cn } from '@/lib/utils'
import type { ComponentPropsWithoutRef, ElementType } from 'react'

type ContainerProps<T extends ElementType = 'div'> = {
  as?: T
  className?: string
} & ComponentPropsWithoutRef<T>

export function Container<T extends ElementType = 'div'>({
  as,
  className,
  ...props
}: ContainerProps<T>) {
  const Component = as || 'div'
  return (
    <Component
      className={cn('mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8', className)}
      {...props}
    />
  )
}
