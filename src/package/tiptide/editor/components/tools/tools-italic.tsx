import { useEditorState } from '@tiptap/react';
import { ItalicIcon } from 'lucide-react';

import { Button } from '../ui/button';

import { useEditorProvider } from '../../hooks/use-editor-provider';
import { Tooltip } from '../tooltip';
import type { ToolProps } from '../../types/tool';

export function ToolsItalic({
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
      isActive: ctx.editor.isActive('italic'),
      can: ctx.editor.can().setItalic(),
    }),
  });

  return (
    <Tooltip
      content={tooltipContent ?? 'Italic'}
      hideTooltip={hideTooltip}
      disabled={!editorState.can}
      side={tooltipPosition}
    >
      <Button
        size={size ?? 'icon-sm'}
        variant={editorState.isActive ? 'secondary' : 'ghost'}
        onClick={() => {
          editor.chain().focus().toggleItalic().run();
          if (typeof propOnClick === 'function') propOnClick(editor);
        }}
        aria-label="Toggle italic"
        type="button"
        className={className}
      >
        {children ?? <ItalicIcon className="size-4" />}
      </Button>
    </Tooltip>
  );
}
