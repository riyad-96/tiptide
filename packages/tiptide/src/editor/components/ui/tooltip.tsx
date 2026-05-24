'use client';

import * as React from 'react';
import { Tooltip as TooltipPrimitive } from 'radix-ui';

import { cn } from '../../style';

function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  );
}

function Tooltip({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return <TooltipPrimitive.Root data-slot="tooltip" {...props} />;
}

function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          'tiptide-theme tt:animate-in tt:bg-foreground tt:text-background tt:fade-in-0 tt:zoom-in-95 tt:data-[side=bottom]:slide-in-from-top-2 tt:data-[side=left]:slide-in-from-right-2 tt:data-[side=right]:slide-in-from-left-2 tt:data-[side=top]:slide-in-from-bottom-2 tt:data-[state=closed]:animate-out tt:data-[state=closed]:fade-out-0 tt:data-[state=closed]:zoom-out-95 tt:z-50 tt:w-fit tt:origin-(--radix-tooltip-content-transform-origin) tt:rounded-md tt:px-3 tt:py-1.5 tt:text-xs tt:text-balance',
          className,
        )}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow className="tt:bg-foreground tt:fill-foreground tt:z-50 tt:size-2.5 tt:translate-y-[calc(-50%-2px)] tt:rotate-45 tt:rounded-[2px]" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
