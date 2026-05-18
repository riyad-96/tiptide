import { memo } from 'react';
import { useEditorState } from '@tiptap/react';
import { BoldIcon } from 'lucide-react';

import { Button } from '../ui/button';

import { useEditorProvider } from '../../hooks/use-editor-provider';
import { Tooltip } from '../tooltip';
import type { ToolProps } from '../../types/tool';

export const ToolsBold = memo(function ToolsBold({
  className,
  hideTooltip,
  tooltipContent,
  children,
  size,
  tooltipPosition,
  onClick: propOnClick,
}: ToolProps) {
  const { editor } = useEditorProvider();

  const editorState = useEditorState({
    editor,
    selector: (ctx) => ({
      isActive: ctx.editor.isActive('bold'),
      can: ctx.editor.can().setBold(),
    }),
  });

  return (
    <Tooltip
      content={tooltipContent ?? 'Bold'}
      hideTooltip={hideTooltip}
      disabled={!editorState.can}
      side={tooltipPosition}
    >
      <Button
        size={size ?? 'icon-sm'}
        variant={editorState.isActive ? 'secondary' : 'ghost'}
        onClick={() => {
          editor.chain().focus().toggleBold().run();
          if (typeof propOnClick === 'function') propOnClick(editor);
        }}
        aria-label="Toggle bold"
        type="button"
        className={className}
      >
        {children ?? <BoldIcon className="size-4" />}
      </Button>
    </Tooltip>
  );
});
