import type { HTMLAttributes, ReactNode } from 'react';
import styles from './Card.module.scss';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hover?: boolean;
  glass?: boolean;
  padding?: 'sm' | 'md' | 'lg';
}

export function Card({
  children,
  hover,
  glass,
  padding = 'md',
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={[
        styles.card,
        hover && styles.hover,
        glass && styles.glass,
        styles[padding],
        className,
      ].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
    </div>
  );
}
