import { cn } from '../../style';

type SeparatorProps = {
  direction?: 'horizontal' | 'vertical';
  className?: string;
};

export function Separator({
  direction = 'vertical',
  className,
}: SeparatorProps) {
  return (
    <div
      className={cn(
        'bg-border shrink-0',
        direction === 'vertical' ? 'mx-1 h-6 w-px' : 'my-1 h-px w-full',
        className,
      )}
    />
  );
}
