import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';

import { cn } from '../../style';

const buttonVariants = cva(
  'tt:inline-flex tt:items-center tt:justify-center tt:gap-2 tt:whitespace-nowrap tt:rounded-md tt:text-sm tt:font-medium tt:transition-all tt:disabled:pointer-events-none tt:disabled:opacity-50 tt:[&_svg]:pointer-events-none tt:[&_svg]:h-4 tt:[&_svg]:w-4 tt:shrink-0 tt:outline-none tt:focus-visible:border-ring tt:focus-visible:ring-ring/50 tt:focus-visible:ring-[3px] tt:aria-invalid:ring-destructive/20 tt:dark:aria-invalid:ring-destructive/40 tt:aria-invalid:border-destructive',
  {
    variants: {
      variant: {
        default:
          'tt:bg-primary tt:text-primary-foreground tt:hover:bg-primary/90',
        destructive:
          'tt:bg-destructive tt:text-white tt:hover:bg-destructive/90 tt:focus-visible:ring-destructive/20 tt:dark:focus-visible:ring-destructive/40 tt:dark:bg-destructive/60',
        outline:
          'tt:border tt:border-border tt:bg-background tt:shadow-xs tt:hover:bg-accent tt:hover:text-accent-foreground tt:dark:bg-input/30 tt:dark:border-input tt:dark:hover:bg-input/50',
        secondary:
          'tt:bg-secondary tt:text-secondary-foreground tt:hover:bg-secondary/80',
        ghost:
          'tt:hover:bg-accent tt:hover:text-accent-foreground tt:dark:hover:bg-accent/50',
        link: 'tt:text-primary tt:underline-offset-4 tt:hover:underline',
      },
      size: {
        default: 'tt:h-9 tt:px-4 tt:py-2 tt:has-[>svg]:px-3',
        xs: "tt:h-6 tt:gap-1 tt:rounded-md tt:px-2 tt:text-xs tt:has-[>svg]:px-1.5 tt:[&_svg:not([class*='size-'])]:size-3",
        sm: 'tt:h-8 tt:rounded-md tt:gap-1.5 tt:px-3 tt:has-[>svg]:px-2.5',
        lg: 'tt:h-10 tt:rounded-md tt:px-6 tt:has-[>svg]:px-4',
        icon: 'tt:size-9',
        'icon-xs':
          "tt:size-6 tt:rounded-md tt:[&_svg:not([class*='size-'])]:size-3",
        'icon-sm': 'tt:size-8',
        'icon-lg': 'tt:size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

function Button({
  className,
  variant = 'default',
  size = 'default',
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : 'button';

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export { Button, buttonVariants };
