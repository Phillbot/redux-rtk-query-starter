import type { ButtonHTMLAttributes } from 'react';

import { cn } from '@/shared/lib/cn';

import styles from './button.module.scss';

type ButtonVariant = 'primary' | 'outline' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const variantClass: Record<ButtonVariant, string> = {
  primary: styles.buttonPrimary,
  outline: styles.buttonOutline,
  ghost: styles.buttonGhost,
};

export const Button = ({ variant = 'primary', className = '', ...rest }: ButtonProps) => (
  <button className={cn(styles.button, variantClass[variant], className)} {...rest} />
);
