import * as React from 'react';

import { cn } from '../../style';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'tt:file:text-foreground tt:placeholder:text-muted-foreground tt:selection:bg-primary tt:selection:text-primary-foreground tt:dark:bg-input/30 tt:h-9 tt:w-full tt:min-w-0 tt:rounded-md tt:border tt:border-border tt:bg-transparent tt:px-3 tt:py-1 tt:text-base tt:shadow-xs tt:transition-[color,box-shadow] tt:outline-none tt:file:inline-flex tt:file:h-7 tt:file:border-0 tt:file:bg-transparent tt:file:text-sm tt:file:font-medium tt:disabled:pointer-events-none tt:disabled:cursor-not-allowed tt:disabled:opacity-50 tt:md:text-sm',
        'tt:focus-visible:border-ring tt:focus-visible:ring-ring/50 tt:focus-visible:ring-[3px]',
        'tt:aria-invalid:ring-destructive/20 tt:dark:aria-invalid:ring-destructive/40 tt:aria-invalid:border-destructive',
        className,
      )}
      {...props}
    />
  );
}

export { Input };
