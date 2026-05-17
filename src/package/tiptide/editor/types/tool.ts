import type { VariantProps } from 'class-variance-authority';
import type { buttonVariants } from '../components/ui/button';
import type { Editor } from '@tiptap/core';

type ButtonProps = VariantProps<typeof buttonVariants>;

export type ToolProps = {
  children?: React.ReactNode;
  className?: string;
  hideTooltip?: boolean;
  tooltipContent?: string;
  size?: ButtonProps['size'];
  tooltipPosition?: 'top' | 'bottom' | 'left' | 'right';
  onClick?: (editor: Editor) => void;
};
