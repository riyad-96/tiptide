import { useEditorState } from '@tiptap/react';
import { TextAlignCenterIcon } from 'lucide-react';

import { Button } from '../ui/button';

import { useEditorProvider } from '../../hooks/use-editor-provider';
import { Tooltip } from '../tooltip';
import type { ToolProps } from '../../types/tool';

export function ToolsAlignCenter({
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
      isActive: ctx.editor.isActive({ textAlign: 'center' }),
      can: ctx.editor.can().setTextAlign('center'),
    }),
  });

  return (
    <Tooltip
      content={tooltipContent ?? 'Align center'}
      hideTooltip={hideTooltip}
      side={tooltipPosition}
    >
      <Button
        size={size ?? 'icon-sm'}
        variant={editorState.isActive ? 'secondary' : 'ghost'}
        onClick={() => {
          editor.chain().focus().toggleTextAlign('center').run();
          if (typeof propOnClick === 'function') propOnClick(editor);
        }}
        aria-label="Align center"
        type="button"
        className={className}
      >
        {children ?? <TextAlignCenterIcon />}
      </Button>
    </Tooltip>
  );
}
