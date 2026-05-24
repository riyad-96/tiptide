import { memo } from 'react';
import { cn } from '../../style';

type SeparatorProps = {
  direction?: 'horizontal' | 'vertical';
  className?: string;
};

export const Separator = memo(function Separator({
  direction = 'vertical',
  className,
}: SeparatorProps) {
  return (
    <div
      className={cn(
        'tt:bg-border tt:shrink-0',
        direction === 'vertical' ? 'tt:mx-1 tt:h-6 tt:w-px' : 'tt:my-1 tt:h-px tt:w-full',
        className,
      )}
    />
  );
});
