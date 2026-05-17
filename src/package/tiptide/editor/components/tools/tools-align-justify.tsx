import { useEditorState } from '@tiptap/react';
import { TextAlignJustifyIcon } from 'lucide-react';

import { Button } from '../ui/button';

import { useEditorProvider } from '../../hooks/use-editor-provider';
import { Tooltip } from '../tooltip';
import type { ToolProps } from '../../types/tool';

export function ToolsAlignJustify({
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
      isActive: ctx.editor.isActive({ textAlign: 'justify' }),
      can: ctx.editor.can().setTextAlign('justify'),
    }),
  });

  return (
    <Tooltip
      content={tooltipContent ?? 'Align justify'}
      hideTooltip={hideTooltip}
      side={tooltipPosition}
    >
      <Button
        size={size ?? 'icon-sm'}
        variant={editorState.isActive ? 'secondary' : 'ghost'}
        onClick={() => {
          editor.chain().focus().toggleTextAlign('justify').run();
          if (typeof propOnClick === 'function') propOnClick(editor);
        }}
        aria-label="Align justify"
        type="button"
        className={className}
      >
        {children ?? <TextAlignJustifyIcon />}
      </Button>
    </Tooltip>
  );
}
