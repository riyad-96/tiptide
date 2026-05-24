'use client';

import * as React from 'react';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { Select as SelectPrimitive } from 'radix-ui';

import { cn } from '../../style';

function Select({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />;
}

function SelectGroup({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />;
}

function SelectValue({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />;
}

function SelectTrigger({
  className,
  size = 'default',
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  size?: 'sm' | 'default';
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        "tt:border-input tt:data-placeholder:text-muted-foreground tt:[&_svg:not([class*='text-'])]:text-muted-foreground tt:focus-visible:border-ring tt:focus-visible:ring-ring/50 tt:aria-invalid:ring-destructive/20 tt:dark:aria-invalid:ring-destructive/40 tt:aria-invalid:border-destructive tt:dark:bg-input/30 tt:dark:hover:bg-input/50 tt:flex tt:w-fit tt:items-center tt:justify-between tt:gap-2 tt:rounded-md tt:border tt:border-border tt:bg-transparent tt:px-3 tt:py-2 tt:text-sm tt:whitespace-nowrap tt:shadow-xs tt:transition-[color,box-shadow] tt:outline-none tt:focus-visible:ring-[3px] tt:disabled:cursor-not-allowed tt:disabled:opacity-50 tt:data-[size=default]:h-9 tt:data-[size=sm]:h-8 tt:*:data-[slot=select-value]:line-clamp-1 tt:*:data-[slot=select-value]:flex tt:*:data-[slot=select-value]:items-center tt:*:data-[slot=select-value]:gap-2 tt:[&_svg]:pointer-events-none tt:[&_svg]:shrink-0 tt:[&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className="tt:size-4 tt:opacity-50" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

function SelectContent({
  className,
  children,
  position = 'item-aligned',
  align = 'center',
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={cn(
          'tiptide-theme tt:bg-popover tt:text-popover-foreground tt:data-[state=open]:animate-in tt:data-[state=closed]:animate-out tt:data-[state=closed]:fade-out-0 tt:data-[state=open]:fade-in-0 tt:data-[state=closed]:zoom-out-95 tt:data-[state=open]:zoom-in-95 tt:data-[side=bottom]:slide-in-from-top-2 tt:data-[side=left]:slide-in-from-right-2 tt:data-[side=right]:slide-in-from-left-2 tt:data-[side=top]:slide-in-from-bottom-2 tt:relative tt:z-50 tt:max-h-(--radix-select-content-available-height) tt:min-w-32 tt:origin-(--radix-select-content-transform-origin) tt:overflow-x-hidden tt:overflow-y-auto tt:rounded-md tt:border tt:border-border tt:shadow-md',
          position === 'popper' &&
            'tt:data-[side=bottom]:translate-y-1 tt:data-[side=left]:-translate-x-1 tt:data-[side=right]:translate-x-1 tt:data-[side=top]:-translate-y-1',
          className,
        )}
        position={position}
        align={align}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            'tt:p-1',
            position === 'popper' &&
              'tt:h-(--radix-select-trigger-height) tt:w-full tt:min-w-(--radix-select-trigger-width) tt:scroll-my-1',
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn('tt:text-muted-foreground tt:px-2 tt:py-1.5 tt:text-xs', className)}
      {...props}
    />
  );
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "tt:focus:bg-accent tt:focus:text-accent-foreground tt:[&_svg:not([class*='text-'])]:text-muted-foreground tt:relative tt:flex tt:w-full tt:cursor-default tt:items-center tt:gap-2 tt:rounded-sm tt:py-1.5 tt:pr-8 tt:pl-2 tt:text-sm tt:outline-hidden tt:select-none tt:data-disabled:pointer-events-none tt:data-disabled:opacity-50 tt:[&_svg]:pointer-events-none tt:[&_svg]:shrink-0 tt:[&_svg:not([class*='size-'])]:size-4 tt:*:[span]:last:flex tt:*:[span]:last:items-center tt:*:[span]:last:gap-2",
        className,
      )}
      {...props}
    >
      <span
        data-slot="select-item-indicator"
        className="tt:absolute tt:right-2 tt:flex tt:size-3.5 tt:items-center tt:justify-center"
      >
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="tt:size-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn('tt:bg-border tt:pointer-events-none tt:-mx-1 tt:my-1 tt:h-px', className)}
      {...props}
    />
  );
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn(
        'tt:flex tt:cursor-default tt:items-center tt:justify-center tt:py-1',
        className,
      )}
      {...props}
    >
      <ChevronUpIcon className="tt:size-4" />
    </SelectPrimitive.ScrollUpButton>
  );
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn(
        'tt:flex tt:cursor-default tt:items-center tt:justify-center tt:py-1',
        className,
      )}
      {...props}
    >
      <ChevronDownIcon className="tt:size-4" />
    </SelectPrimitive.ScrollDownButton>
  );
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
