import { memo } from 'react';
import {
  Tooltip as ShadcnTooltip,
  TooltipContent,
  TooltipTrigger,
} from './ui/tooltip';

import { useEditorProvider } from '../hooks/use-editor-provider';

type TooltipProps = {
  children: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
  side?: 'top' | 'left' | 'right' | 'bottom';
  hideTooltip?: boolean;
};

export const Tooltip = memo(function Tooltip({
  children,
  content,
  disabled,
  side = 'bottom',
  hideTooltip: propHideTooltip,
}: TooltipProps) {
  const { hideTooltip: providerHideTooltip } = useEditorProvider();

  const hideTooltip =
    typeof propHideTooltip === 'boolean'
      ? propHideTooltip
      : providerHideTooltip;

  return (
    <ShadcnTooltip disableHoverableContent>
      <TooltipTrigger asChild disabled={disabled}>
        {children}
      </TooltipTrigger>

      <TooltipContent hidden={Boolean(hideTooltip)} side={side}>
        {content}
      </TooltipContent>
    </ShadcnTooltip>
  );
});

