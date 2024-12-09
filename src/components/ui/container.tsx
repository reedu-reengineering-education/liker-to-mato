import { cn } from "@/lib/utils";
import { ElementType, HTMLAttributes, ReactNode } from "react";

interface ContainerProps<T extends ElementType = "div"> {
  as?: T;
  className?: string;
  children?: ReactNode;
  props?: HTMLAttributes<HTMLElement>;
}

export function Container<T extends ElementType = "div">({
  className,
  as: Component = "div" as T,
  children,
  ...props
}: ContainerProps<T> & Omit<HTMLAttributes<HTMLElement>, keyof ContainerProps<T>>) {
  return (
    <Component
      className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)}
      {...props}
    >
      {children}
    </Component>
  );
}
