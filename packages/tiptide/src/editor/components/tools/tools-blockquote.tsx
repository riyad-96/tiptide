import { memo } from 'react';
import { useEditorState } from '@tiptap/react';
import { TextQuoteIcon } from 'lucide-react';

import { Button } from '../ui/button';

import { useEditorProvider } from '../../hooks/use-editor-provider';
import { Tooltip } from '../tooltip';
import type { ToolProps } from '../../types/tool';

export const ToolsBlockquote = memo(function ToolsBlockquote({
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
      isActive: ctx.editor.isActive('blockquote'),
      can: ctx.editor.can().toggleBlockquote(),
    }),
  });

  return (
    <Tooltip
      content={tooltipContent ?? 'Blockquote'}
      hideTooltip={hideTooltip}
      disabled={!editorState.can}
      side={tooltipPosition}
    >
      <Button
        size={size ?? 'icon-sm'}
        variant={editorState.isActive ? 'secondary' : 'ghost'}
        onClick={() => {
          editor.chain().focus().toggleBlockquote().run();
          if (typeof propOnClick === 'function') propOnClick(editor);
        }}
        aria-label="Toggle blockquote"
        type="button"
        className={className}
      >
        {children ?? <TextQuoteIcon className="size-4" />}
      </Button>
    </Tooltip>
  );
});
