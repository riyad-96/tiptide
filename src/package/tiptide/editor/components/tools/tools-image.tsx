import { memo } from 'react';
import { Button } from '../ui/button';
import { useEditorProvider } from '../../hooks/use-editor-provider';
import { ImagePlusIcon } from 'lucide-react';
import { Tooltip } from '../tooltip';

import type { ToolProps } from '../../types/tool';

export const ToolsImage = memo(function ToolsImage({
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
      content={tooltipContent ?? 'Add image'}
      hideTooltip={hideTooltip}
      side={tooltipPosition}
    >
      <Button
        variant="ghost"
        size={size ?? 'sm'}
        onClick={() => {
          editor.chain().focus().insertImagePlaceholder().run();
          if (typeof propOnClick === 'function') propOnClick(editor);
        }}
        type="button"
        className={className}
      >
        {children ?? (
          <>
            <ImagePlusIcon />
            <span>Add</span>
          </>
        )}
      </Button>
    </Tooltip>
  );
});

