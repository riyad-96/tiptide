import { memo } from 'react';
import { useEditorState } from '@tiptap/react';
import { TextAlignEndIcon } from 'lucide-react';

import { Button } from '../ui/button';

import { useEditorProvider } from '../../hooks/use-editor-provider';
import { Tooltip } from '../tooltip';
import type { ToolProps } from '../../types/tool';

export const ToolsAlignRight = memo(function ToolsAlignRight({
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
      isActive: ctx.editor.isActive({ textAlign: 'right' }),
      can: ctx.editor.can().setTextAlign('right'),
    }),
  });

  return (
    <Tooltip
      content={tooltipContent ?? 'Align right'}
      hideTooltip={hideTooltip}
      side={tooltipPosition}
    >
      <Button
        size={size ?? 'icon-sm'}
        variant={editorState.isActive ? 'secondary' : 'ghost'}
        onClick={() => {
          editor.chain().focus().toggleTextAlign('right').run();
          if (typeof propOnClick === 'function') propOnClick(editor);
        }}
        aria-label="Align right"
        type="button"
        className={className}
      >
        {children ?? <TextAlignEndIcon />}
      </Button>
    </Tooltip>
  );
});

