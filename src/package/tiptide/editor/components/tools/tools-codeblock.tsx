import { memo } from 'react';
import { useEditorState } from '@tiptap/react';
import { CodeSquareIcon } from 'lucide-react';

import { Button } from '../ui/button';

import { useEditorProvider } from '../../hooks/use-editor-provider';
import { Tooltip } from '../tooltip';
import type { ToolProps } from '../../types/tool';

export const ToolsCodeblock = memo(function ToolsCodeblock({
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
      isActive: ctx.editor.isActive('codeBlock'),
      can: ctx.editor.can().toggleCodeBlock(),
    }),
  });

  return (
    <Tooltip
      content={tooltipContent ?? 'Codeblock'}
      hideTooltip={hideTooltip}
      side={tooltipPosition}
    >
      <Button
        size={size ?? 'icon-sm'}
        variant={editorState.isActive ? 'secondary' : 'ghost'}
        onClick={() => {
          editor.chain().focus().toggleCodeBlock().run();
          if (typeof propOnClick === 'function') propOnClick(editor);
        }}
        aria-label="Toggle code block"
        type="button"
        className={className}
      >
        {children ?? <CodeSquareIcon className="size-4" />}
      </Button>
    </Tooltip>
  );
});
