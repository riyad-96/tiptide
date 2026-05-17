import { memo } from 'react';
import { useEditorState } from '@tiptap/react';
import { TextAlignStartIcon } from 'lucide-react';

import { Button } from '../ui/button';

import { useEditorProvider } from '../../hooks/use-editor-provider';
import { Tooltip } from '../tooltip';
import type { ToolProps } from '../../types/tool';

export const ToolsAlignLeft = memo(function ToolsAlignLeft({
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
      isActive: ctx.editor.isActive({ textAlign: 'left' }),
      can: ctx.editor.can().setTextAlign('left'),
    }),
  });

  return (
    <Tooltip
      content={tooltipContent ?? 'Align left'}
      hideTooltip={hideTooltip}
      side={tooltipPosition}
    >
      <Button
        size={size ?? 'icon-sm'}
        variant={editorState.isActive ? 'secondary' : 'ghost'}
        onClick={() => {
          editor.chain().focus().toggleTextAlign('left').run();
          if (typeof propOnClick === 'function') propOnClick(editor);
        }}
        aria-label="Align left"
        type="button"
        className={className}
      >
        {children ?? <TextAlignStartIcon />}
      </Button>
    </Tooltip>
  );
});

