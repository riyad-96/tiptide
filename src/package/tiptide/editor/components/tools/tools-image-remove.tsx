import { memo } from 'react';
import { XIcon } from 'lucide-react';

import { Button } from '../ui/button';

import { useEditorProvider } from '../../hooks/use-editor-provider';
import { Tooltip } from '../tooltip';
import type { ToolProps } from '../../types/tool';

export const ToolsImageRemove = memo(function ToolsImageRemove({
  className,
  hideTooltip,
  tooltipContent,
  children,
  size,
  tooltipPosition,
  onClick: propOnClick,
}: ToolProps) {
  const { editor } = useEditorProvider();

  return (
    <Tooltip
      content={tooltipContent ?? 'Remove image'}
      hideTooltip={hideTooltip}
      side={tooltipPosition ?? 'top'}
    >
      <Button
        variant="ghost"
        size={size ?? 'icon-sm'}
        onClick={() => {
          editor.chain().deleteSelection().run();
          if (typeof propOnClick === 'function') propOnClick(editor);
        }}
        type="button"
        className={className}
      >
        {children ?? <XIcon className="size-4" />}
      </Button>
    </Tooltip>
  );
});
